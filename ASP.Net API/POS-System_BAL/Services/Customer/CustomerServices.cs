using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_DAL;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Customer
{
    public class CustomerServices : ICustomerServices
    {
        private readonly OnlinePosContext _onlinePosContext;
        private readonly IMapper _mapper;

        public CustomerServices( IMapper mapper, OnlinePosContext onlinePosContext)
        {
            _mapper = mapper;
            _onlinePosContext = onlinePosContext;
        }

        #region GET

        public async Task<IEnumerable<TblCustomer>> GetAllCustomer(string company_id, string customer_id = null, string customer_name = null)
        {
            var customers = await _onlinePosContext.TblCustomers
                .Where(c => String.IsNullOrEmpty(company_id) || c.CompanyId == company_id)
                .Where(c => String.IsNullOrEmpty(customer_id) || c.CustomerId == customer_id)
                .Where(c => String.IsNullOrEmpty(customer_name) || c.CustomerName.Contains(customer_name))
                .ToListAsync();
            return customers;
        }

        public async Task<TblCustomer> GetCustomer(string company_id, string customer_id)
        {
            var customer = await _onlinePosContext.TblCustomers
                .Where(c => c.CompanyId == company_id && c.CustomerId == customer_id)
                .FirstOrDefaultAsync();
            return customer;
        }

        #endregion

        #region POST

        public async Task CreateCustomer(TblCustomer customer)
        {
            var customerCounter = GenerateCustomerID(customer.CompanyId);
            customer.CustomerCounter = GetCustomerCounterByStoreId(customer.CompanyId) +1;
            customer.CustomerId = customer.CompanyId + customerCounter;
            _onlinePosContext.TblCustomers
                .Add(customer);
            await _onlinePosContext.SaveChangesAsync();
        }

        #endregion

        #region PUT

        public async Task UpdateCustomer(string companyId,string customerId, 
            string customerName, string customerAddress, 
            string customerPhone, string customerEmail, int allowDebt)
        {
            var existCustomer = await GetCustomer(companyId, customerId);
            if (existCustomer != null)
            {
                existCustomer.CustomerName = customerName; 
                existCustomer.CustomerEmail = customerEmail;
                existCustomer.CustomerPhone = customerPhone;
                existCustomer.CustomerAddress = customerAddress;
                existCustomer.Allowdebt = allowDebt;
                existCustomer.CreatedDate = DateTime.Today;
                _onlinePosContext.Update(existCustomer);
                await _onlinePosContext.SaveChangesAsync();
            }
            else
            {
                throw  new Exception("Customer not found");
            }
        }

        #endregion

        #region DELETE

        public async Task DeleteCustomer(string company_id,string customer_id)
        {
            var customer = await _onlinePosContext.TblCustomers.FirstOrDefaultAsync(
                c => c.CompanyId == company_id && c.CustomerId == customer_id);
            _onlinePosContext.TblCustomers.Remove(customer);
            await _onlinePosContext.SaveChangesAsync();
        }
        
        #endregion

        #region AUTO-GEN

        private string GenerateCustomerID(
            string company_id)
        {
            int counter = GetCustomerCounterByStoreId(company_id);
            var nCounter = counter + 1;
            string customer_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return customer_id;
        }


        private int GetCustomerCounterByStoreId(
            string company_id)
        {
            var customerCounter = _onlinePosContext.TblCustomers
                .Where(g => g.CompanyId == company_id)
                .OrderBy(g => g.CompanyId)
                .ThenByDescending(g => g.CustomerCounter)
                .Select(g => g.CustomerCounter)
                .FirstOrDefault();
            return customerCounter;
        }

        #endregion
       


      

    }
}
