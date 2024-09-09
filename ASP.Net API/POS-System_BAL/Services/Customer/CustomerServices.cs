using Microsoft.EntityFrameworkCore;
using POS_System_DAL;
using POS_System_DAL.Models;
using POS_System_DAL.Repository.Customer;
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

        public CustomerServices( IGenericRepository<TblCustomer> genericRepository)
        {
            _genericRepository = genericRepository;
        }

        public async Task<IEnumerable<TblCustomer>> GetAllCustomer(string company_id)
        {
            var customers = await _genericRepository.GettAllAsync(c => c.CompanyId == company_id);
            return customers;
        }

        public async Task<TblCustomer> GetCustomer(string company_id, string customer_id)
        {
            var customer = await _genericRepository.GetAsync(c => c.CompanyId == company_id && c.CustomerId == customer_id);
            return customer;
        }

        public async Task<TblCustomer> CreateCustomer(TblCustomer customer)
        {
            await _genericRepository.AddAsync(customer);
            return customer;
        }

        public async Task<TblCustomer> UpdateCustomer(TblCustomer customer)
        {
            await _genericRepository.UpdateAsync(customer);
            return customer; 
        }

        public async Task DeleteCustomer( string customer_id)
        {
            await _genericRepository.DeleteAsync(c => c.CustomerId == customer_id);
        }


    }
}
