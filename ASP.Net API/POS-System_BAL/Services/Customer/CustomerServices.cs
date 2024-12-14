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

        public async Task<IEnumerable<TblCustomer>> GetAllCustomer(string company_id)
        {
            var customers = await _onlinePosContext.TblCustomers
                .Where(c => c.CompanyId == company_id)
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
            var customerCounter = GenerateCustomerID(customer.CompanyId, customer.CreatedDate);
            customer.CustomerCounter = GetCustomerCounterByStoreId(customer.CompanyId, customer.CreatedDate) +1;
            customer.CustomerId = customer.CompanyId + customerCounter;
            _onlinePosContext.TblCustomers
                .Add(customer);
            await _onlinePosContext.SaveChangesAsync();
        }

        #endregion

        #region PUT

        public async Task UpdateCustomer(CustomerDTO customerDto)
        {
            if (customerDto.CompanyId != null)
            {
                var existCustomer = await GetCustomer(customerDto.CompanyId, customerDto.CustomerId);
                _mapper.Map(customerDto, existCustomer);
                _onlinePosContext.Update(existCustomer);
            }
        }

        #endregion

        #region DELETE

        public async Task DeleteCustomer(string company_id,string customer_id)
        {
            var customer = GetCustomer(company_id, customer_id);
            _onlinePosContext.Remove(customer);
            await _onlinePosContext.SaveChangesAsync();
        }
        
        #endregion

        #region AUTO-GEN

        private string GenerateCustomerID(
            string company_id, DateTime created_date)
        {
            int counter = GetCustomerCounterByStoreId(company_id, created_date);
            var nCounter = counter + 1;
            string customer_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return customer_id;
        }


        private int GetCustomerCounterByStoreId(
            string company_id, DateTime created_date)
        {
            var customerCounter = _onlinePosContext.TblCustomers
                .Where(g => g.CompanyId == company_id 
                            && g.CreatedDate.Date == created_date.Date)
                .OrderBy(g => g.CompanyId)
                .ThenByDescending(g => g.CustomerCounter)
                .Select(g => g.CustomerCounter)
                .FirstOrDefault();
            return customerCounter;
        }

        #endregion
       


      

    }
}
