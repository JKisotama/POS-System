using POS_System_DAL.Data;
using POS_System_DAL.Models;

namespace POS_System_BAL.Services.SaleReport;

public class SaleServices : ISaleServices
{
    private readonly OnlinePosContext _onlinePosContext;

    public SaleServices(OnlinePosContext context)
    {
        _onlinePosContext = context;
    }

    public async Task<IEnumerable<TblPo>> GetSalesData(string storeId, DateTime startDate, DateTime endDate)
    {
        var result = _onlinePosContext.TblPos
            .Where(pos => pos.PosStatus == 3
                          && pos.PosDate >= startDate
                          && pos.PosDate <= endDate
                          && pos.StoreId == storeId)
            .GroupBy(pos => pos.PosDate)
            .Select(g => new TblPo
            {
                PosNumber = g.FirstOrDefault().PosNumber, // Get the PosNumber from the first record in the group
                PosDate = g.Key,
                PosTotal = g.Sum(pos => pos.PosTotal) ?? 0, // Handle nullable sums
                PosDiscount = g.Sum(pos => pos.PosDiscount) ?? 0,
                PosTopay = g.Sum(pos => pos.PosTopay) ?? 0,
                CashierId = g.FirstOrDefault().CashierId, // Get the CashierId from the first record
                CustomerName = g.FirstOrDefault().CustomerName, // Get the CustomerName from the first record
                PosPaymentmethod = g.FirstOrDefault().PosPaymentmethod, // Get the PosPaymentMethod from the first record
                Payer = g.FirstOrDefault().Payer, // Get the Payer from the first record
                Paymentdate = g.FirstOrDefault().Paymentdate 
            })
            .OrderBy(g => g.PosDate)
            .ToList();

        return result;
    }
    
    
    public async Task<IEnumerable<TblPosdetail>> SaleReportByGoods(string store_id, DateTime start_date, DateTime end_date)
    {
            var result = _onlinePosContext.TblPos
                .Join(_onlinePosContext.TblPosdetails,
                    pos => pos.PosNumber,
                    posDetail => posDetail.PosNumber,
                    (pos, posDetail) => new { pos, posDetail })
                .Where(x => x.pos.StoreId == store_id 
                            && x.pos.PosDate >= start_date 
                            && x.pos.PosDate <= end_date)
                .GroupBy(x => new 
                {
                    x.posDetail.GoodsId,
                    x.posDetail.GoodsName,
                    x.posDetail.ItemUnit,
                    x.posDetail.PropertyValue,
                    x.posDetail.LineTotal
                })
                .Select(g => new TblPosdetail() // Change to ResultType
                {
                    GoodsId = g.Key.GoodsId,
                    GoodsName = g.Key.GoodsName,
                    ItemUnit = g.Key.ItemUnit,
                    PropertyValue = g.Key.PropertyValue,
                    LineTotal = g.Key.LineTotal,
                    ItemQuantity = g.Sum(x => x.posDetail.ItemQuantity) // Sum the quantities
                })
                .OrderBy(g => g.GoodsName) // Order by a relevant property
                .ToList();

            return result;
        }
    }

