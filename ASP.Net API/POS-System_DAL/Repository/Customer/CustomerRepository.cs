using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Customer
{
    public class CustomerRepository : ICustomerRepository
    {
        private OnlinePosContext _onlinePosContext;
        public CustomerRepository(OnlinePosContext onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }

        public async Task<IEnumerable<TblCustomer>> GetAll(string company_id)
        {
            return await _onlinePosContext.TblCustomers
                .Where(c => c.CompanyId == company_id)
                .ToListAsync();
        }

        public async Task<TblCustomer> GetCustomer(string company_id, string customer_id)
        {
            return await _onlinePosContext.TblCustomers
                .FirstOrDefaultAsync(c => c.CompanyId == company_id && c.CustomerId == customer_id);
        }

        public async Task SaveCustomer(TblCustomer tblCustomer)
        {
            _onlinePosContext.TblCustomers.Add(tblCustomer);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task UpdateCustomer(TblCustomer tblCustomer)
        {
            _onlinePosContext.TblCustomers.Update(tblCustomer);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task DeleteCustomer(string company_id, string customer_id)
        {
            var onDelete = await GetCustomer(company_id, customer_id);
            _onlinePosContext.Remove(onDelete);
            await _onlinePosContext.SaveChangesAsync();
        }

        public int GetCustomerCounterByStoreId(string company_id, DateTime created_Date)
        {
            using (_onlinePosContext = new OnlinePosContext())
            {
                var customerCounter = _onlinePosContext.TblCustomers
                    .Where(g => g.CompanyId == company_id && g.CreatedDate == created_Date)
                    .Select(g => g.CustomerCounter)
                    .FirstOrDefault();
                return (int)customerCounter;
            }
        }
    }
}
