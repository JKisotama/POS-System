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
            string store_id, 
            [FromQuery]PagingParameters paging)
        {
            var pageResult = await _posServices.GetGoodListAsync(store_id, paging);
            return Ok(pageResult);
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
            string groupProperty, 
            string goodProperty,
            string goodsUnit, 
            double quantity)
        {
            try
            {
                await _posServices.SavePoItemAsync(storeId, posNumber, goodsId, goodsUnit, quantity,goodProperty,groupProperty);
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
            int paymentType, 
            string payer)
        {
            try
            {
                var po = await _context.TblPos
                    .FirstOrDefaultAsync(p => p.StoreId == storeId && p.PosNumber == posNumber);

                if (po == null)
                {
                    return NotFound("POS header not found.");
                }

                po.PosStatus = 1; 
                po.PosCustomerpay = customerPay;
                po.PosExchange = customerPay - po.PosTopay;
                po.PosPaymenttype = paymentType;
                po.Payer = payer;
                po.Paymentdate = DateTime.Now;

                await _context.SaveChangesAsync();
                return Ok("Transaction finalized successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error finalizing transaction: {ex.Message}");
            }
        }

        private bool TblPoExists(string id)
        {
            return _context.TblPos.Any(e => e.PosNumber == id);
        }
    }
}
