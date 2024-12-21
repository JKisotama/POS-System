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

        #region GET

        public async Task<PageResult<TblGood>> GetGoodListAsync(string goodsName, string barcodeFilter,
            PagingParameters paging)
        {
            var query = _onlinePosContext.TblGoods
                .Include(g => g.Group)
                .Include(g => g.TblSellprices)
                .AsQueryable();

            if (!string.IsNullOrEmpty(goodsName))
            {
                query = query.Where(g => g.GoodsName.Contains(goodsName));
            }

            if (!string.IsNullOrEmpty(barcodeFilter))
            {
                query = query.Where(g => g.TblSellprices.Any(sp => sp.Barcode.Contains(barcodeFilter)));
            }

            var count = await query.CountAsync();

            var list = await query
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


        public async Task<IEnumerable<TblPo>> GetPoHangList(string store_id)
        {
            var hang_list = await _onlinePosContext.TblPos
                .Where(p => p.StoreId == store_id &&
                            p.PosStatus == 1)
                .ToListAsync();
            return hang_list;
        }

        public async Task GetPoHeaderList(
            string store_id)
        {
        }


        public async Task GetDataByShift(
            string store_id, string shift_number)
        {
        }


        public async Task<TblPo> CreateTemporaryPoHeader(
            string storeId,
            string cashierId,
            string posCreator)
        {
            cashierId = "1";

            var existingPoHeader = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == storeId &&
                                          p.CashierId == cashierId &&
                                          p.PosStatus == 0);
            if (existingPoHeader != null)
            {
                return existingPoHeader;
            }

            var previousPoHeader = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == storeId &&
                                          p.CashierId == cashierId &&
                                          (p.PosStatus == 1 || p.PosStatus == 2 || p.PosStatus == 3));

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


        public async Task<TblPosdetail> GetPoItemsAsync(string storeId, string posNumber)
        {
            var item = await _onlinePosContext
                .TblPosdetails
                .FirstOrDefaultAsync(s => s.PosNumber == posNumber);
            return item;
        }

        public async Task<IEnumerable<TblPosdetail>> GetPoItemsListAsync(string storeId, string posNumber)
        {
            var items = await _onlinePosContext
                .TblPosdetails
                .Where(s => s.StoreId == storeId && s.PosNumber == posNumber)
                .Join(
                    _onlinePosContext.TblPos,
                    detail => new { detail.StoreId, detail.PosNumber },
                    header => new { header.StoreId, header.PosNumber },
                    (detail, header) => new { detail, header }
                )
                .Where(joined => joined.header.PosStatus != 3) // Exclude finished PO if status = 3
                .Select(joined => joined.detail)
                .ToListAsync();
            return items;
        }

        #endregion


        #region POST

        public async Task<TblPo> CreatePoHeaderAsync(string storeId, string cashierId, string posCreator)
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
                return newPo;
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
            string barcode,
            string goodsUnit,
            double quantity,
            string goodsPropertyName,
            string groupPropertyName,
            string posCreator
        )
        {
            var good = await _onlinePosContext.TblGoods
                .Include(g => g.TblSellprices)
                .FirstOrDefaultAsync(g => g.StoreId == storeId && g.GoodsId == goodsId);

            var itemPrice = await _onlinePosContext.TblSellprices
                .Where(sp =>
                    sp.StoreId == storeId && sp.GoodsId == goodsId && sp.GoodsUnit == goodsUnit && sp.SellNumber == 1)
                .Select(sp => sp.SellPrice)
                .FirstOrDefaultAsync();

            var unitName = await _onlinePosContext.TblGoodsunits
                .Where(u => u.StoreId == storeId && u.GoodsUnit == goodsUnit)
                .Select(u => u.GoodsUnit)
                .FirstOrDefaultAsync();

            if (unitName == null)
            {
                throw new Exception("Unit name not found for the specified unit.");
            }


            var poHeader = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == storeId && p.PosNumber == posNumber);

            if (poHeader == null)
            {
                poHeader = await CreateTemporaryPoHeader(storeId, "1", posCreator);
                await _onlinePosContext.TblPos.AddAsync(poHeader);
                await _onlinePosContext.SaveChangesAsync();
            }

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
                var subTotal = (itemPrice ?? 0) * existingDetail.ItemQuantity;
                double newTotalPrice =
                    await CalculateSellingPriceAsync(storeId, goodsId, existingDetail.ItemQuantity, goodsUnit);
                existingDetail.LineTotal = newTotalPrice;
                existingDetail.SubTotal = subTotal;
                existingDetail.ItemPrice = itemPrice;
                existingDetail.LineDiscount = subTotal - newTotalPrice;
            }
            else
            {
                int? maxItemOrder = await _onlinePosContext.TblPosdetails
                    .Where(detail => detail.StoreId == storeId && detail.PosNumber == posNumber)
                    .Select(detail => detail.ItemOrder)
                    .OrderByDescending(order => order)
                    .FirstOrDefaultAsync();

                int nextItemOrder = (maxItemOrder ?? 0) + 1;


                double totalPrice = await CalculateSellingPriceAsync(storeId, goodsId, quantity, goodsUnit);

                // if (existingDetail != null)
                // {
                //     existingDetail.ItemQuantity += quantity;
                //     existingDetail.LineTotal += totalPrice;
                // }
                // else
                // {
                var newDetail = new TblPosdetail
                {
                    StoreId = storeId,
                    PosNumber = posNumber,
                    GoodsId = goodsId,
                    Barcode = barcode,
                    GoodsName = good.GoodsName,
                    ItemUnit = goodsUnit,
                    ItemQuantity = quantity,
                    ItemPrice = itemPrice,
                    SubTotal = (itemPrice ?? 0) * quantity,
                    LineTotal = totalPrice,
                    LineDiscount = ((itemPrice ?? 0) * quantity) - totalPrice,
                    Property = groupPropertyName,
                    PropertyValue = goodsPropertyName,
                    ItemOrder = nextItemOrder
                };

                await _onlinePosContext.TblPosdetails.AddAsync(newDetail);
            }


            await _onlinePosContext.SaveChangesAsync();
            await UpdatePoTotalsAsync(storeId, posNumber);
        }

        #endregion


        #region PUT

        public async Task UpdatePoTotalsAsync(string storeId, string posNumber)
        {
            var poDetails = await _onlinePosContext.TblPosdetails
                .Where(detail => detail.StoreId == storeId && detail.PosNumber == posNumber)
                .ToListAsync();


            double posTotal = 0;
            double posDiscount = 0;

            foreach (var detail in poDetails)
            {
                posTotal += detail.LineTotal;
                posDiscount += detail.LineDiscount;
            }

            double posTopay = posTotal - posDiscount;


            var po = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == storeId && p.PosNumber == posNumber);

            if (po != null)
            {
                po.PosTotal = posTotal;
                po.PosDiscount = posDiscount;
                po.PosTopay = posTopay;
                if (po.CustomerName == null)
                {
                    po.CustomerName = "visitor";    
                }
                
                try
                {
                    Console.WriteLine("Attempting to save PO detail...");
                    await _onlinePosContext.SaveChangesAsync();
                    Console.WriteLine("PO detail saved successfully.");
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error when update PO: {ex.Message}");
                }
            }
        }

        public async Task CancelPo(string storeId, string posNumber)
        {
            var po = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == storeId && p.PosNumber == posNumber);

            if (po == null)
            {
                throw new Exception("POS record not found.");
            }

            if (po.PosStatus == 1 || po.PosStatus == 2 || po.PosStatus == 3)
            {
                throw new Exception("Cannot cancel this PO.");
            }


            if (po.PosStatus == 0)
            {
                po.PosStatus = 2;
                po.CancelDate = DateTime.Now;

            }
            
            try
            {
                await _onlinePosContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error canceling PO: {ex.Message}");
            }
        }

        public async Task PayPO(
            string store_id,
            string po_number,
            double customer_pay,
            string payer,
            int pay_method)
        {
            var po = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == store_id && p.PosNumber == po_number);

            if (po == null)
            {
                throw new Exception("POS record not found.");
            }

            if (po.PosStatus == 2)
            {
                throw new Exception("Cannot pay for a canceled PO.");
            }

            if (po.PosPaymentmethod == 1 && customer_pay != po.PosTopay)
            {
                throw new Exception(
                    "For banking payments, the customer payment amount must be equal to the total amount to pay.");
            }

            po.PosStatus = 3;
            po.Payer = payer;
            po.PosPaymentmethod = pay_method;
            po.PosTotal = po.PosTopay;
            po.PosDiscount = po.PosDiscount;
            po.PosCustomerpay = customer_pay;
            po.PosPaymenttype = 1;
            po.PosExchange = customer_pay - po.PosTotal;

            try
            {
                await _onlinePosContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error processing payment: {ex.Message}");
            }
        }

        public async Task HangPo(string storeId, string posNumber)
        {
            var po = await _onlinePosContext.TblPos
                .FirstOrDefaultAsync(p => p.StoreId == storeId && p.PosNumber == posNumber);

            if (po == null)
            {
                throw new Exception("POS record not found.");
            }

            if (po.PosStatus == 0)
            {
                po.PosStatus = 1;
            }
            else
            {
                po.PosStatus = 0;
            }

            try
            {
                await _onlinePosContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating POS status: {ex.Message}");
            }
        }

        #endregion


        #region DELETE

        public async Task DeletePoItemAsync(string storeId, string posNumber, int item_order)
        {
            var item = await _onlinePosContext.TblPosdetails
                .FirstOrDefaultAsync(detail =>
                    detail.StoreId == storeId &&
                    detail.PosNumber == posNumber && 
                    detail.ItemOrder == item_order);
            if (item == null)
            {
                throw new Exception("Item not found for the given details.");
            }

            _onlinePosContext.TblPosdetails.Remove(item);

            try
            {
                await _onlinePosContext.SaveChangesAsync();
                await UpdatePoTotalsAsync(storeId, posNumber);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting PO item: {ex.Message}");
            }
        }

        #endregion


        #region AUTO-GEN

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

        #endregion
        
        


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
    }
}