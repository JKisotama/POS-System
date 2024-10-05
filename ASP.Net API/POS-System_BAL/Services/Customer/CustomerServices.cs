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
        private readonly IGenericRepository<TblCustomer> _genericRepository;
        private readonly OnlinePosContext _onlinePosContext;
        private readonly IMapper _mapper;

        public CustomerServices( IGenericRepository<TblCustomer> genericRepository, IMapper mapper, OnlinePosContext onlinePosContext)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
            _onlinePosContext = onlinePosContext;
        }

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

        public async Task CreateCustomer(TblCustomer customer)
        {
            var customerCounter = GenerateCustomerID(customer.CompanyId, customer.CreatedDate);
            customer.CustomerCounter = GetCustomerCounterByStoreId(customer.CompanyId, customer.CreatedDate) +1;
            customer.CustomerId = customer.CompanyId + customerCounter;
            _onlinePosContext.TblCustomers
                .Add(customer);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task UpdateCustomer(CustomerDTO customerDTO)
        {
            var existCustomer = await GetCustomer(customerDTO.CompanyId, customerDTO.CustomerId);
            if (existCustomer != null)
            {
                _mapper.Map(customerDTO, existCustomer);
                await _genericRepository.UpdateAsync(existCustomer);
            }
            
            
        }

        public string GenerateCustomerID(string company_id, DateTime created_date)
        {
            int counter = GetCustomerCounterByStoreId(company_id, created_date);
            var nCounter = counter + 1;
            string customer_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return customer_id;
        }


        public int GetCustomerCounterByStoreId(string company_id, DateTime created_date)
        {
                var customerCounter = _onlinePosContext.TblCustomers
                  .Where(g => g.CompanyId == company_id && g.CreatedDate.Date == created_date.Date)
                  .OrderBy(g => g.CompanyId)
                  .ThenByDescending(g => g.CustomerCounter)
                  .Select(g => g.CustomerCounter)
                  .FirstOrDefault();
                return customerCounter;
        }


        public async Task DeleteCustomer(string company_id,string customer_id)
        {
            var customer = GetCustomer(company_id, customer_id);
            _onlinePosContext.Remove(customer);
            await _onlinePosContext.SaveChangesAsync();
        }


    }
}
