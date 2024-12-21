using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_BAL.Services.Customer;
using POS_System_DAL.Data;
using POS_System_DAL.Models;


namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerServices _customerServices;

        public CustomerController(ICustomerServices customerServices)
        {
            _customerServices = customerServices;
        }

        #region GET

        [HttpGet("GettAllCustomer")]
        public async Task<ActionResult<IEnumerable<TblCustomer>>> GetTblCustomers([FromQuery]string company_id = null, [FromQuery]string customer_id = null, [FromQuery] string filter = null)
        {
            
            var customers = await _customerServices.GetAllCustomer(company_id,customer_id,filter);
            return Ok(customers);
        }

        [HttpGet("GetCustomer")]
        public async Task<ActionResult<TblCustomer>> GetTblCustomer(string comapny_id, string customer_id)
        {
            var customer = await _customerServices.GetCustomer(comapny_id, customer_id);

            if (customer == null)
            {
                return NotFound("No Customer Found");
            }

            return Ok(customer);
        }

        #endregion

        #region POST

        [HttpPost("SaveCustomer")]
        public async Task<ActionResult<TblCustomer>> PostTblCustomer(TblCustomer tblCustomer)
        {
            await _customerServices.CreateCustomer(tblCustomer);
            


            return CreatedAtAction("GetTblCustomer", new { id = tblCustomer.CustomerId }, tblCustomer);
        }

        #endregion

        #region PUT

        [HttpPut("EditCustomer")]
        public async Task<IActionResult> PutTblCustomer(string company_id, string customer_id,
            string customer_name, string customer_address,
            string customer_phone, string customer_email, int allow_debt)
        {
            if(company_id == null || customer_id == null)
            {
                return BadRequest();
            }
            await _customerServices.UpdateCustomer(company_id, customer_id, customer_name, customer_address, customer_phone, customer_email, allow_debt);
            return NoContent();

            
        }


        #endregion


        #region DELETE

        [HttpDelete("DeleteCustomer")]
        public async Task<IActionResult> DeleteTblCustomer(string comapny_id, string customer_id)
        {
            var existCustomer = await GetTblCustomer(comapny_id, customer_id); 
            if (existCustomer == null)
            {
                return NotFound();
            }

            await _customerServices.DeleteCustomer(comapny_id,customer_id);

            return NoContent();
        }

        #endregion

        
    }
}
