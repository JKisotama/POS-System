using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using POS_System_BAL.Helper;
using POS_System_BAL.Services.Customer;
using POS_System_BAL.Services.Goods;
using POS_System_BAL.Services.Receipt;

namespace POS_System_BAL.Services.POS
{
    public class PosServices : IPosServices
    {
        private readonly OnlinePosContext _onlinePosContext;
        private readonly ICustomerServices _customerServices;
        private readonly IGoodsServices _goodsServices;

        public PosServices(
            OnlinePosContext onlinePosContext,
            ICustomerServices customerServices,
            IGoodsServices goodsServices)
        {
            _onlinePosContext = onlinePosContext;
            _customerServices = customerServices;
            _goodsServices = goodsServices;
        }

        public async Task<PageResult<TblGood>> GetGoodListAsync(string store_id, PagingParameters paging)
        {
            var count = await _onlinePosContext
                .TblGoods
                .CountAsync(s => s.StoreId == store_id);

            var list = await _onlinePosContext.TblGoods
                .Where(s => s.StoreId == store_id)
                .Include(g => g.Group)
                .Include(s => s.TblSellprices)
                .Skip((paging.PageNumber - 1) * paging.PageSize)
                .Take(paging.PageSize)
                .ToListAsync();
            var goods = list.Select(g => new TblGood
            {
                GroupId = g.GroupId,
                GoodsId = g.GoodsId,
                GoodsName = g.GoodsName,
                GoodsBrand = g.GoodsBrand,
                GoodsStatus = g.GoodsStatus,
                StoreId = g.StoreId,
                GoodsCounter = g.GoodsCounter,
                Picture = g.Picture,
                TblSellprices = g.TblSellprices.Select(sp => new TblSellprice
                {
                    Id = sp.Id,
                    GoodsId = sp.GoodsId,
                    Barcode = sp.Barcode,
                    GoodsUnit = sp.GoodsUnit,
                    SellNumber = sp.SellNumber,
                    SellPrice = sp.SellPrice,
                    StoreId = sp.StoreId,
                }).ToList()
            });

            return new PageResult<TblGood>(goods, count);
        }


        public async Task GetGoodsByBarcode(string store_id, string barcode)
        {
        }

        public async Task GetPoAsync(string store_id, int status)
        {
            var purchaseOrders = await _onlinePosContext.TblPos
                .Where(po => po.StoreId == store_id && po.PosStatus == status)
                .ToListAsync();
        }


        public async Task CreatePoHeaderAsync(string storeId, string cashierId, string posCreator)
        {
            var posNumber = GerenatePosNumber(storeId, cashierId, DateTime.Now);
            var posCounter = GetPosCounterByStoreId(storeId, cashierId, DateTime.Now);

            var newPo = new TblPo
            {
                StoreId = storeId,
                PosNumber = posNumber,
                CashierId = cashierId,
                PosDate = DateTime.Now.Date,
                PosTotal = 0,
                PosDiscount = 0,
                PosTopay = 0,
                PosCreator = posCreator,
                PosCounter = posCounter + 1,
                PosStatus = 0
            };

            try
            {
                await _onlinePosContext.TblPos.AddAsync(newPo);
                await _onlinePosContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating PO header: {ex.Message}");
            }
        }

        public async Task SavePoItemAsync(
            string storeId,
            string posNumber,
            string goodsId,
            string goodsUnit,
            double quantity,
            string goodsPropertyName,
            string groupPropertyName
        )
        {
            // Fetch the goods with related sell prices
            var good = await _onlinePosContext.TblGoods
                .Include(g => g.TblSellprices)
                .FirstOrDefaultAsync(g => g.StoreId == storeId && g.GoodsId == goodsId);

            if (good == null)
            {
                throw new Exception("Goods not found in the store.");
            }

            //Kiểm tra xem trong PODetails của storeId, posNumber có mã hàng trùng goodId, goodsUnit, goodPropertyName, groupPropertyName
            //Nếu có thì lấy số lượng của dòng đó + quantity rồi tính giá bán của số lượng mới sau đó cập nhật vào trong PoDetails
            //Nếu ko có thì insert vào PoDetails

            var unitName = await _onlinePosContext.TblGoodsunits
                .Where(u => u.StoreId == storeId && u.GoodsUnit == goodsUnit)
                .Select(u => u.GoodsUnit)
                .FirstOrDefaultAsync();

            if (unitName == null)
            {
                throw new Exception("Unit name not found for the specified unit.");
            }


            // Check if the item already exists in POS details
            var existingDetail = await _onlinePosContext.TblPosdetails
                .FirstOrDefaultAsync(detail => detail.StoreId == storeId &&
                                               detail.PosNumber == posNumber &&
                                               detail.GoodsId == goodsId &&
                                               detail.ItemUnit == goodsUnit &&
                                               detail.Property == groupPropertyName &&
                                               detail.PropertyValue == goodsPropertyName);

            if (existingDetail != null)
            {
                existingDetail.ItemQuantity += quantity;
                double? newTotalPrice = await CalculateSellingPriceAsync(storeId, goodsId, existingDetail.ItemQuantity, goodsUnit);
                existingDetail.LineTotal = newTotalPrice ?? 0;
            }
            else
            {
                 existingDetail = await _onlinePosContext.TblPosdetails
                    .FirstOrDefaultAsync(detail => detail.StoreId == storeId &&
                                                   detail.PosNumber == posNumber &&
                                                   detail.GoodsId == goodsId &&
                                                   detail.ItemUnit == goodsUnit);
                 if (existingDetail == null)
                 {
                     double? totalPrice = await CalculateSellingPriceAsync(storeId, goodsId, quantity, goodsUnit);
                     totalPrice = totalPrice ?? 0;
                     if (existingDetail != null)
                     {
                         existingDetail.ItemQuantity += quantity;
                         existingDetail.LineTotal += totalPrice;
                     }
                     else
                     {
                         var newDetail = new TblPosdetail
                         {
                             StoreId = storeId,
                             PosNumber = posNumber,
                             GoodsId = goodsId,
                             GoodsName = good.GoodsName,
                             ItemUnit = goodsUnit,
                             ItemQuantity = quantity,
                             LineTotal = totalPrice,
                             Property = groupPropertyName,
                             PropertyValue = goodsPropertyName
                         };

                         await _onlinePosContext.TblPosdetails.AddAsync(newDetail);
                     }
                 }
                 else
                 {
                     // var az = existingDetail.ItemQuantity + quantity;
                     // double? newTotalPrice = await CalculateSellingPriceAsync(storeId, goodsId, az, goodsUnit);
                     // chưa làm
                 }
                
            }
            await _onlinePosContext.SaveChangesAsync();
            await UpdatePoTotalsAsync(storeId, posNumber);
        }


        public async Task UpdatePoTotalsAsync(string storeId, string posNumber)
        {
            var poDetails = await _onlinePosContext.TblPosdetails
                .Where(detail => detail.StoreId == storeId && detail.PosNumber == posNumber)
                .ToListAsync();

            var posTotal = poDetails.Sum(detail => detail.LineTotal);
            var posDiscount = 0.0;
            var posTopay = posTotal - posDiscount;

            var po = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == storeId && p.PosNumber == posNumber);

            if (po != null)
            {
                po.PosTotal = posTotal;
                po.PosDiscount = posDiscount;
                po.PosTopay = posTopay;

                try
                {
                    Console.WriteLine("Attempting to save PO detail...");
                    await _onlinePosContext.SaveChangesAsync();
                    Console.WriteLine("PO detail saved successfully.");
                }
                catch (Exception ex)
                {
                    throw new Exception($"Lỗi khi cập nhật tổng giá trị PO: {ex.Message}");
                }
            }
        }


        public async Task UpdateStatus(
            string store_id,
            string po_number,
            int status)
        {
        }


        public async Task PayPO(
            string store_id,
            string po_number,
            double customer_pay,
            string payer,
            int payment_type,
            double money_return)
        {
            var po = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == store_id && p.PosNumber == po_number);

            if (po != null)
            {
                po.PosStatus = 1;
                po.Payer = payer;
                po.PosTotal = customer_pay - po.PosTopay;
                po.PosPaymentmethod = payment_type;

                try
                {
                    await _onlinePosContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error to Pay POS: {ex.Message}");
                }
            }
        }

        public async Task GetDataByShift(
            string store_id, string shift_number)
        {
        }

        public TblPo CreateTemporaryPoHeader(
            string storeId,
            string cashierId,
            string posCreator)
        {
            cashierId = "1";
            var posNumber = GerenatePosNumber(storeId, cashierId, DateTime.Now);
            var posCounter = GetPosCounterByStoreId(storeId, cashierId, DateTime.Now);
            return new TblPo
            {
                StoreId = storeId,
                PosNumber = posNumber,
                CashierId = cashierId,
                PosDate = DateTime.Now.Date,
                PosTotal = 0,
                PosDiscount = 0,
                PosTopay = 0,
                PosCreator = posCreator,
                PosCounter = posCounter + 1,
                PosStatus = 0
            };
        }

        public async Task<PageResult<TblPo>> GetPoHeadersWithPagingAsync(string storeId, PagingParameters paging)
        {
            var totalCount = await _onlinePosContext.TblPos
                .CountAsync(p => p.StoreId == storeId);

            var headers = await _onlinePosContext.TblPos
                .Where(p => p.StoreId == storeId)
                .OrderByDescending(p => p.PosDate)
                .Skip((paging.PageNumber - 1) * paging.PageSize)
                .Take(paging.PageSize)
                .ToListAsync();

            return new PageResult<TblPo>(headers, totalCount);
        }


        private string GerenatePosNumber(
            string store_id,
            string cashier_id,
            DateTime created_date)
        {
            int counter = GetPosCounterByStoreId(store_id, cashier_id, created_date);
            var nCounter = counter + 1;
            string pos_number = "P" + cashier_id + created_date.ToString("yyMMdd") +
                                new string('0', 3 - counter.ToString().Length) + nCounter.ToString();
            return pos_number;
        }

        private int GetPosCounterByStoreId(string store_id, string cashier_id, DateTime created_date)
        {
            var posCounter = _onlinePosContext.TblPos
                .Where(p => p.StoreId == store_id
                            && p.PosDate == created_date.Date
                            && p.CashierId == cashier_id)
                .OrderBy(p => p.StoreId)
                .ThenByDescending(p => p.PosCounter)
                .Select(p => p.PosCounter)
                .FirstOrDefault();
            return posCounter;
        }


        public async Task<double> CalculateSellingPriceAsync(string storeId, string goodsId, double quantity,
            string unit)
        {
            double totalPrice = 0;

            var priceTiers = await _onlinePosContext.TblSellprices
                .Where(bg => bg.StoreId == storeId &&
                             bg.GoodsId == goodsId &&
                             bg.GoodsUnit == unit)
                .OrderByDescending(bg => bg.SellNumber)
                .Select(bg => new
                {
                    bg.SellNumber,
                    SellPrice = bg.SellPrice ?? 0.0
                })
                .ToListAsync();

            if (!priceTiers.Any())
            {
                return 0;
            }

            int wholeQuantity = (int)quantity;
            double fractionalPart = quantity - wholeQuantity;

            double? remainingQuantity = wholeQuantity;
            foreach (var tier in priceTiers)
            {
                if (remainingQuantity >= tier.SellNumber)
                {
                    int applicableUnits = (int)(remainingQuantity / tier.SellNumber);
                    totalPrice += applicableUnits * tier.SellPrice;
                    remainingQuantity %= tier.SellNumber;
                }
            }


            if (fractionalPart > 0)
            {
                var basePrice = priceTiers.Last().SellPrice;
                totalPrice += fractionalPart * basePrice;
            }

            return totalPrice;
        }


        public async Task HangPo(string storeId, string posNumber)
        {
            // Fetch the PO record based on store ID and POS number
            var po = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == storeId && p.PosNumber == posNumber);

            if (po == null)
            {
                throw new Exception("POS record not found.");
            }

            // Check and toggle the status
            if (po.PosStatus == 2)
            {
                po.PosStatus = 1;
            }
            else
            {
                po.PosStatus = 2;
            }

            try
            {
                // Save the changes
                await _onlinePosContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating POS status: {ex.Message}");
            }
        }
    }
}