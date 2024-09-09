using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.Services.Supplier;
using POS_System_DAL.Data;
using POS_System_DAL.Models;


namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierServices _supplierServices;

        public SuppliersController(ISupplierServices supplierServices)
        {
            _supplierServices = supplierServices;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblSupplier>>> GetTblSuppliers(string store_id)
        {
            return Ok(await _supplierServices.GetAllSupplier(store_id));
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblSupplier>> GetTblSupplier(string store_id, string supplier_id)
        {
            var tblSupplier = await _supplierServices.GetSupplier(store_id, supplier_id);

            if (tblSupplier == null)
            {
                return NotFound();
            }

            return Ok(tblSupplier);
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

            /*await _supplierServices.UpdateSupplier()*/;

            return NoContent();
        }

      
        [HttpPost]
        public async Task<ActionResult<TblSupplier>> PostTblSupplier(TblSupplier tblSupplier)
        {
            var supplier = await _supplierServices.CreateSupplier(tblSupplier);

            return CreatedAtAction("GetTblSupplier", new { id = tblSupplier.SupplierId }, tblSupplier);
        }

        // DELETE: api/Suppliers/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTblSupplier(string id)
        //{
        //    var tblSupplier = await _context.TblSuppliers.FindAsync(id);
        //    if (tblSupplier == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.TblSuppliers.Remove(tblSupplier);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        
    }
}
