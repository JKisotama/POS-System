using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
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
        private readonly IMapper _mapper;

        public CustomerServices( IGenericRepository<TblCustomer> genericRepository, IMapper mapper)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
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

        public async Task UpdateCustomer(CustomerDTO customerDTO)
        {
            var existCustomer = await GetCustomer(customerDTO.CompanyId, customerDTO.CustomerId);
            if (existCustomer != null)
            {
                _mapper.Map(customerDTO, existCustomer);
                await _genericRepository.UpdateAsync(existCustomer);
            }
            
            
        }

        public async Task DeleteCustomer( string customer_id)
        {
            await _genericRepository.DeleteAsync(c => c.CustomerId == customer_id);
        }


    }
}
