using POS_System_DAL.Data;
using POS_System_DAL.Models;

namespace POS_System_BAL.Services.SaleReport;

public class SaleServices
{
    private readonly OnlinePosContext _context;

    public SaleServices(OnlinePosContext context)
    {
        _context = context;
    }

    public List<TblPo> GetSalesData(string storeId, DateTime startDate, DateTime endDate)
    {
        var result = _context.TblPos
            .Where(pos => pos.PosStatus == 3
                          && pos.PosDate >= startDate
                          && pos.PosDate <= endDate
                          && pos.StoreId == storeId)
            .GroupBy(pos => pos.PosDate)
            .Select(g => new TblPo
            {
                PosDate = g.Key,
                PosTotal = g.Sum(pos => pos.PosTotal),
                PosDiscount = g.Sum(pos => pos.PosDiscount),
                PosTopay = g.Sum(pos => pos.PosTopay)
            })
            .OrderBy(g => g.PosDate)
            .ToList();

        return result;
    }
}
