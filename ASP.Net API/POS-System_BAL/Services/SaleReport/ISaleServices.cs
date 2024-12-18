using POS_System_DAL.Models;

namespace POS_System_BAL.Services.SaleReport;

public interface ISaleServices
{
    Task<IEnumerable<TblPo>> GetSalesData(string storeId, DateTime startDate, DateTime endDate);
    Task<IEnumerable<TblPosdetail>> SaleReportByGoods(string store_id, DateTime start_date, DateTime end_date);
}