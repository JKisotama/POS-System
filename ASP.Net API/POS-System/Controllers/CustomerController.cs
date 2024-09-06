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
    public class CustomerController : ControllerBase
    {
        private readonly OnlinePosContext _context;

        public CustomerController(OnlinePosContext context)
        {
            _context = context;
        }

        // GET: api/Customer
        [HttpGet("Gett All Customer")]
        public async Task<ActionResult<IEnumerable<TblCustomer>>> GetTblCustomers()
        {
            return await _context.TblCustomers.ToListAsync();
        }

        // GET: api/Customer/5
        [HttpGet("Get Customer {id}")]
        public async Task<ActionResult<TblCustomer>> GetTblCustomer(string id)
        {
            var tblCustomer = await _context.TblCustomers.FindAsync(id);

            if (tblCustomer == null)
            {
                return NotFound();
            }

            return tblCustomer;
        }

        // PUT: api/Customer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Edit Customer {id}")]
        public async Task<IActionResult> PutTblCustomer(string id, TblCustomer tblCustomer)
        {
            if (id != tblCustomer.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(tblCustomer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblCustomerExists(id))
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

        // POST: api/Customer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Save Customer")]
        public async Task<ActionResult<TblCustomer>> PostTblCustomer(TblCustomer tblCustomer)
        {
            _context.TblCustomers.Add(tblCustomer);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TblCustomerExists(tblCustomer.CustomerId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTblCustomer", new { id = tblCustomer.CustomerId }, tblCustomer);
        }

        // DELETE: api/Customer/5
        [HttpDelete("Delete Customer {id}")]
        public async Task<IActionResult> DeleteTblCustomer(string id)
        {
            var tblCustomer = await _context.TblCustomers.FindAsync(id);
            if (tblCustomer == null)
            {
                return NotFound();
            }

            _context.TblCustomers.Remove(tblCustomer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblCustomerExists(string id)
        {
            return _context.TblCustomers.Any(e => e.CustomerId == id);
        }
    }
}
