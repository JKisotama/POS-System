using POS_System_BAL.DTOs;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Supplier
{
    public interface ISupplierServices
    {
        Task<IEnumerable<TblSupplier>> GetAllSupplier(string store_id);
        Task<TblSupplier> GetSupplier(string store_id, string supplier_id);
        Task<TblSupplier> CreateSupplier(TblSupplier supplier);
        Task UpdateSupplier(SupplierDTO supplierDTO);
        Task<TblSupplier> DeleteAsync(string store_id, string supplier_id);
    }
}
