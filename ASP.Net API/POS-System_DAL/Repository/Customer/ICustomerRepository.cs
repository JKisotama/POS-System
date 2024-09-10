using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Customer
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<TblCustomer>> GetAll(string company_id);
        Task<TblCustomer> GetCustomer(string company_id, string customer_id);
        Task SaveCustomer(TblCustomer tblCustomer);
        Task UpdateCustomer(TblCustomer tblCustomer);
        Task DeleteCustomer(string company_id, string customer_id);
        int GetCustomerCounterByStoreId(string company_id, DateTime created_Date);
    }
}
