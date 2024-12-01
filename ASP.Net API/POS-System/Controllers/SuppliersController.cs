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

        [HttpPut("UpdateSupplier")]
        public async Task<IActionResult> PutTblSupplier(SupplierDTO supplierDTO)
        {
            var updateSupplier = await _supplierServices.GetSupplier(supplierDTO.StoreId, supplierDTO.SupplierId);
            if (updateSupplier == null)
            {
                return NotFound();
            }
            await _supplierServices.UpdateSupplier(supplierDTO);
            return NoContent();
        }


        [HttpPost("CreateSupplier")]
        public async Task<ActionResult<TblSupplier>> PostTblSupplier(SupplierDTO supplierDTO)
        {
            await _supplierServices.CreateSupplier(supplierDTO);

            return StatusCode(201, supplierDTO);
        }
    }
}
