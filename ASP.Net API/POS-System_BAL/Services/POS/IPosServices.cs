using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.POS
{
    public interface IPosServices
    {
        Task<IEnumerable<TblCustomer>> GetCustomerListAsync(string store_id);
    }
}
