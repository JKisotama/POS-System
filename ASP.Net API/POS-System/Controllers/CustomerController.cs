﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET: api/Customer
        [HttpGet("Gett All Customer")]
        public async Task<ActionResult<IEnumerable<TblCustomer>>> GetTblCustomers(string company_id)
        {
            var customers = await _customerServices.GetAllCustomer(company_id);
            return Ok(customers);
        }

        // GET: api/Customer/5
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

        // PUT: api/Customer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Edit Customer")]
        public async Task<IActionResult> PutTblCustomer(string customer_id, [FromBody]TblCustomer tblCustomer)
        {
            if(customer_id == tblCustomer.CustomerId)
            {
                await _customerServices.UpdateCustomer(tblCustomer);
                return NoContent();
            }
           

            
            return BadRequest();
        }

        // POST: api/Customer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Save Customer")]
        public async Task<ActionResult<TblCustomer>> PostTblCustomer(TblCustomer tblCustomer)
        {
            await _customerServices.CreateCustomer(tblCustomer);
            


            return CreatedAtAction("GetTblCustomer", new { id = tblCustomer.CustomerId }, tblCustomer);
        }

        // DELETE: api/Customer/5
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