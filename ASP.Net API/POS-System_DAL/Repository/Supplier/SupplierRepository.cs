using POS_System_DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Supplier
{
    public class SupplierRepository
    {
        private OnlinePosContext _onlinePosContext;
        public SupplierRepository(OnlinePosContext onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }
        public int GetSupplierCounterByStoreId(string storeId, DateTime created_Date)
        {
            using (_onlinePosContext = new OnlinePosContext())
            {
                var supplierCounetr = _onlinePosContext.TblSuppliers
                    .Where(g => g.StoreId == storeId && g.CreatedDate == created_Date.Date)
                    .Select(g => g.SupplierCounter)
                    .FirstOrDefault();
                return (int)supplierCounetr;
            }
        }
    }
}
