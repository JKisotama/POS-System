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
    public class SuppliersController : ControllerBase
    {
        private readonly OnlinePosContext _context;

        public SuppliersController(OnlinePosContext context)
        {
            _context = context;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblSupplier>>> GetTblSuppliers()
        {
            return await _context.TblSuppliers.ToListAsync();
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblSupplier>> GetTblSupplier(string id)
        {
            var tblSupplier = await _context.TblSuppliers.FindAsync(id);

            if (tblSupplier == null)
            {
                return NotFound();
            }

            return tblSupplier;
        }

        // PUT: api/Suppliers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblSupplier(string id, TblSupplier tblSupplier)
        {
            if (id != tblSupplier.SupplierId)
            {
                return BadRequest();
            }

            _context.Entry(tblSupplier).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblSupplierExists(id))
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

        // POST: api/Suppliers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblSupplier>> PostTblSupplier(TblSupplier tblSupplier)
        {
            _context.TblSuppliers.Add(tblSupplier);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TblSupplierExists(tblSupplier.SupplierId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTblSupplier", new { id = tblSupplier.SupplierId }, tblSupplier);
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblSupplier(string id)
        {
            var tblSupplier = await _context.TblSuppliers.FindAsync(id);
            if (tblSupplier == null)
            {
                return NotFound();
            }

            _context.TblSuppliers.Remove(tblSupplier);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblSupplierExists(string id)
        {
            return _context.TblSuppliers.Any(e => e.SupplierId == id);
        }
    }
}
