using POS_System_BAL.DTOs;
using POS_System_DAL.Models;


namespace POS_System_BAL.Services.Customer
{
    public interface ICustomerServices
    {
        Task<IEnumerable<TblCustomer>> GetAllCustomer(string company_id);
        Task<TblCustomer> GetCustomer(string company_id, string customer_id);
        Task CreateCustomer(TblCustomer customer);

        Task UpdateCustomer(string companyId, string customerId,
            string customerName, string customerAddress,
            string customerPhone, string customerEmail, int allowDebt);
        Task DeleteCustomer(string company_id,string customer_id);
    }
}
