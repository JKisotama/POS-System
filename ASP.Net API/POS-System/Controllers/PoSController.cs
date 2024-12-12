using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.Helper;
using POS_System_BAL.Services.POS;
using POS_System_DAL.Data;
using POS_System_DAL.Models;


namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PoSController : ControllerBase
    {
        private readonly OnlinePosContext _context;
        private readonly IPosServices _posServices;

        public PoSController(OnlinePosContext context, IPosServices services)
        {
            _context = context;
            _posServices = services;
        }


        [HttpGet("GetGoodsList")]
        public async Task<ActionResult> GetGoodsList(
            string goodName,
            [FromQuery]PagingParameters paging,
            string filter = null)
        {
            var pageResult = await _posServices.GetGoodListAsync(goodName, filter,paging);
            return Ok(pageResult);
        } 
        
        
        [HttpGet("GetPoHangList")]
        public async Task<ActionResult<IEnumerable<TblPo>>> GetPoHangList(string store_id)
        {
            var list = await  _posServices.GetPoHangList(store_id);
            return Ok(list);
        }
        
        [HttpPut("CancelPo")]
        public async Task<ActionResult> GetPoHeaderList(string store_id, string pos_number)
        {
            var list = _posServices.CancelPo(store_id,pos_number);
            return NoContent();
        }
        
        [HttpGet("GetPOSDetails")]
        public async Task<ActionResult> GetDetails(
            string store_id, 
            string pos_number)
        {
            var items = await _posServices.GetPoItemsAsync(store_id, pos_number);
            return Ok(items);
        }
        
        [HttpGet("GetPODetailsByPoHeader")]
        public async Task<ActionResult> GetDetailList(string store_id, string posNumber)
        {
            var list = await _posServices.GetPoItemsListAsync(store_id, posNumber);
            return Ok(list);
        }
        
        [HttpGet("GenerateTempHeader")]
        public IActionResult GenerateTempHeader(
            string storeId, 
            string posCreator,
            string cashierId = null)
        {
            var tempHeader = _posServices.CreateTemporaryPoHeader(storeId, cashierId, posCreator);
            return Ok(tempHeader);
        }
        

        [HttpPost("AddItem")]
        public async Task<IActionResult> AddItem(
            string storeId, 
            string posNumber, 
            string goodsId, 
            string barcode,
            string groupProperty, 
            string goodProperty,
            string goodsUnit, 
            double quantity,
            string posCreator)
        {
            try
            {
                await _posServices.SavePoItemAsync(storeId, posNumber, goodsId, barcode,goodsUnit, quantity,goodProperty,groupProperty, posCreator);
                return Ok("Item added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding item: {ex.Message}");
            }
        }

        [HttpPost("FinalizeTransaction")]
        public async Task<IActionResult> FinalizeTransaction(
            string storeId,
            string posNumber,
            double customerPay,
            string payer,
            int paymentMethod)
        {
            try
            {
                await _posServices.PayPO(storeId, posNumber, customerPay, payer, paymentMethod);
                return Ok("Payment Processed Successfully");

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPut("HangPO")]
        public async Task HangPo(string storeId, string posNumber)
        {
            await _posServices.HangPo(storeId, posNumber);
        }
    }
}
