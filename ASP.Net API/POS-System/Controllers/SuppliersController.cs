using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
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

        #region GET
        [HttpGet("GetAllSupplier")]
        public async Task<ActionResult<IEnumerable<TblSupplier>>> GetTblSuppliers(string store_id)
        {
            var supplier = await _supplierServices.GetAllSupplier(store_id);
            return Ok(supplier);
        }

        [HttpGet("GetSupplier")]
        public async Task<ActionResult<TblSupplier>> GetTblSupplier(string store_id, string supplier_id)
        {
            var tblSupplier = await _supplierServices.GetSupplier(store_id, supplier_id);

            if (tblSupplier == null)
            {
                return NotFound();
            }

            return Ok(tblSupplier);
        }

        #endregion

        #region POST

        [HttpPost("CreateSupplier")]
        public async Task<ActionResult<TblSupplier>> PostTblSupplier(SupplierDTO supplierDTO)
        {
            await _supplierServices.CreateSupplier(supplierDTO);

            return StatusCode(201, supplierDTO);
        }

        #endregion
        
        #region PUT

        [HttpPut("UpdateSupplier")]
        public async Task<IActionResult> PutTblSupplier(string store_id, string supplier_id, 
            string supplier_name, int supplier_type, 
            string supplier_address, string supplier_phone, 
            string supplier_email, int allowDebt)
        {
            await _supplierServices.UpdateSupplier(store_id, supplier_id, 
                supplier_name, supplier_type, 
                supplier_address, supplier_phone, 
                supplier_email, allowDebt);
            return NoContent();
        }

        #endregion

        #region DELETE

        [HttpDelete("DeleteSupplier")]
        public async Task<IActionResult> DeleteSupplier(string store_id, string supplier_id)
        {
            try
            {
                await _supplierServices.DeleteSupplierAsync(store_id, supplier_id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

       


      
    }
}
