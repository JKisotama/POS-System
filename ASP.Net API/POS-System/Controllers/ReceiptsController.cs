using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.Services.Receipt;
using POS_System_DAL.Data;
using POS_System_DAL.Models;


namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptsController : ControllerBase
    {
        private readonly IReceiptServices _receiptServices;

        public ReceiptsController(IReceiptServices receiptServices)
        {
            _receiptServices = receiptServices;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblReceipt>>> GetTblReceipts(string store_id)
        {
            await _receiptServices.GetReceiptList(store_id);
            return Ok(store_id);
        }

        [HttpGet("Get Reciept")]
        public async Task<ActionResult<TblReceipt>> GetTblReceipt(string store_id, string receipt_number)
        {
            var tblReceipt = await _receiptServices.GetReceipt(store_id, receipt_number);

            if (tblReceipt == null)
            {
                return NotFound();
            }

            return Ok(tblReceipt);
        }

        //[HttpPut("")]
        //public async Task<IActionResult> PutTblReceipt(string id, TblReceipt tblReceipt)
        //{
        //    if (id != tblReceipt.ReceiptNumber)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(tblReceipt).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TblReceiptExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        
        [HttpPost]
        public async Task<ActionResult<TblReceipt>> PostTblReceipt([FromQuery]TblReceipt tblReceipt)
        {
            

            return CreatedAtAction("GetTblReceipt", new { id = tblReceipt.ReceiptNumber }, tblReceipt);
        }

        // DELETE: api/Receipts/5
        [HttpDelete("Delete Receipt")]
        public async Task<IActionResult> DeleteTblReceipt(string id)
        {
      
            return NoContent();
        }

    }
}
