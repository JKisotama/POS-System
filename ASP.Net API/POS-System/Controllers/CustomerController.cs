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


        [HttpGet("Gett All Customer")]
        public async Task<ActionResult<IEnumerable<TblCustomer>>> GetTblCustomers(string company_id)
        {
            var customers = await _customerServices.GetAllCustomer(company_id);
            return Ok(customers);
        }

        [HttpGet("Get Customer")]
        public async Task<ActionResult<TblCustomer>> GetTblCustomer(string comapny_id, string customer_id)
        {
            var customer = await _customerServices.GetCustomer(comapny_id, customer_id);

            if (customer == null)
            {
                return NotFound("No Customer Found");
            }

            return Ok(customer);
        }


        [HttpPut("Edit Customer")]
        public async Task<IActionResult> PutTblCustomer(string comapny_id,string customer_id, CustomerDTO customerDTO)
        {
            if(customer_id != customerDTO.CustomerId)
            {
                return BadRequest();
            }

            customerDTO.CompanyId = comapny_id;
            customerDTO.CustomerId = customer_id;
            await _customerServices.UpdateCustomer(customerDTO);
            return NoContent();

            
        }

        [HttpPost("Save Customer")]
        public async Task<ActionResult<TblCustomer>> PostTblCustomer(TblCustomer tblCustomer)
        {
            await _customerServices.CreateCustomer(tblCustomer);
            


            return CreatedAtAction("GetTblCustomer", new { id = tblCustomer.CustomerId }, tblCustomer);
        }

        [HttpDelete("Delete Customer ")]
        public async Task<IActionResult> DeleteTblCustomer(string comapny_id, string customer_id)
        {
            var existCustomer = GetTblCustomer(comapny_id, customer_id); 
            if (existCustomer == null)
            {
                return NotFound();
            }

            await _customerServices.DeleteCustomer(customer_id);

            return NoContent();
        }
    }
}
