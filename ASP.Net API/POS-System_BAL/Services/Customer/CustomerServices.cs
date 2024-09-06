using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Models;
using POS_System_DAL.Repository.Customer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Customer
{
    public class CustomerServices
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerServices(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<TblCustomer> CreateCustomer(TblCustomer customer)
        {
            await _customerRepository.SaveCustomer(customer);
            return customer;
        }

        public async Task<TblCustomer> UpdateCustomer(TblCustomer tblCustomer)
        {
            await _customerRepository.UpdateCustomer(tblCustomer);
            return tblCustomer; 
        }

        public async Task<TblCustomer> DeleteCustomer(string company_id, string customer_id)
        {
            await _customerRepository.DeleteCustomer(company_id, customer_id);
            return null;
        }


    }
}
