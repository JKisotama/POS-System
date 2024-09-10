using POS_System_BAL.DTOs;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Customer
{
    public interface ICustomerServices
    {
        Task<IEnumerable<TblCustomer>> GetAllCustomer(string company_id);
        Task<TblCustomer> GetCustomer(string company_id, string customer_id);
        Task<TblCustomer> CreateCustomer(TblCustomer customer);
        Task UpdateCustomer(CustomerDTO customerDTO);
        Task DeleteCustomer(string customer_id);
    }
}
