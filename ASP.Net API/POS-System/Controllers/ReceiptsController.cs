using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;


namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptsController : ControllerBase
    {
        private readonly OnlinePosContext _context;

        public ReceiptsController(OnlinePosContext context)
        {
            _context = context;
        }

        // GET: api/Receipts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblReceipt>>> GetTblReceipts()
        {
            return await _context.TblReceipts.ToListAsync();
        }

        // GET: api/Receipts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblReceipt>> GetTblReceipt(string id)
        {
            var tblReceipt = await _context.TblReceipts.FindAsync(id);

            if (tblReceipt == null)
            {
                return NotFound();
            }

            return tblReceipt;
        }

        // PUT: api/Receipts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblReceipt(string id, TblReceipt tblReceipt)
        {
            if (id != tblReceipt.ReceiptNumber)
            {
                return BadRequest();
            }

            _context.Entry(tblReceipt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblReceiptExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Receipts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblReceipt>> PostTblReceipt(TblReceipt tblReceipt)
        {
            _context.TblReceipts.Add(tblReceipt);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TblReceiptExists(tblReceipt.ReceiptNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTblReceipt", new { id = tblReceipt.ReceiptNumber }, tblReceipt);
        }

        // DELETE: api/Receipts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblReceipt(string id)
        {
            var tblReceipt = await _context.TblReceipts.FindAsync(id);
            if (tblReceipt == null)
            {
                return NotFound();
            }

            _context.TblReceipts.Remove(tblReceipt);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblReceiptExists(string id)
        {
            return _context.TblReceipts.Any(e => e.ReceiptNumber == id);
        }
    }
}
