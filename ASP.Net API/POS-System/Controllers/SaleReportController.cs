using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using POS_System_BAL.Services.SaleReport;
using POS_System_DAL.Models;

namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleReportController : ControllerBase
    {
        private readonly ISaleServices _saleServices;

        public SaleReportController(ISaleServices saleServices)
        {
            _saleServices = saleServices;
        }
        [HttpGet("GetSaleReport")]
        public async Task<ActionResult<List<TblPo>>> GetSalesReport(string storeId, DateTime startDate, DateTime endDate)
        {

            var salesData = await _saleServices.GetSalesData(storeId,startDate,endDate);

            if (salesData == null || salesData.Count() == 0)
            {
                return NotFound("No sales data found for the specified criteria.");
            }

            return Ok(salesData);
        }
        
        [HttpGet("GetReportByGoodsSold")]
        public async Task<ActionResult<IEnumerable<TblPo>>> GetSalesReportByGoods(string storeId, DateTime startDate, DateTime endDate)
        {
            if (string.IsNullOrWhiteSpace(storeId))
            {
                return BadRequest("Store ID is required.");
            }

            if (startDate > endDate)
            {
                return BadRequest("Start date must be less than or equal to end date.");
            }
            try
            {
                var report = await _saleServices.SaleReportByGoods(storeId, startDate, endDate);
                if (report == null || !report.Any())
                {
                    return NotFound("No sales data found for the specified criteria.");
                }

                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}