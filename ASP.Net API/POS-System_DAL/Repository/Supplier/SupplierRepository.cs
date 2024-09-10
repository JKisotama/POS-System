using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Supplier
{
    public class SupplierRepository : GenericRepository<TblSupplier>, ISupplierRepository
    {
        private OnlinePosContext _onlinePosContext;
        public SupplierRepository(OnlinePosContext onlinePosContext) : base(onlinePosContext) 
        {
            _onlinePosContext = onlinePosContext;
        }

        public Task<bool> SupplierExist(string store_id, string supplier_id)
        {
            return _onlinePosContext.TblSuppliers.AnyAsync(s => s.StoreId == store_id && s.SupplierId == supplier_id);
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
