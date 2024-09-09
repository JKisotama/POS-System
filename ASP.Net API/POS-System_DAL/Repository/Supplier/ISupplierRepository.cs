using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Supplier
{
    public interface ISupplierRepository : IGenericRepository<TblSupplier>
    {
        Task<bool> SupplierExist(string store_id, string supplier_id);
        int GetSupplierCounterByStoreId(string storeId, DateTime created_Date);

    }
}
