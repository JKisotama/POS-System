using POS_System_BAL.DTOs;
using POS_System_DAL.Models;


namespace POS_System_BAL.Services.Supplier
{
    public interface ISupplierServices
    {
        #region GET

        Task<IEnumerable<TblSupplier>> GetAllSupplier(string store_id);
        Task<TblSupplier> GetSupplier(string store_id, string supplier_id);

        #endregion

        #region POST

        Task CreateSupplier(SupplierDTO supplier);

        #endregion

        #region PUT

        Task UpdateSupplier(
            string storeId, string supplierId,
            string supplierName, int type,
            string address, string phone,
            string email, int allowDebt);

        #endregion

        #region DELETE

        Task<TblSupplier> DeleteSupplierAsync(string store_id, string supplier_id);

        #endregion
      
       
        
       
    }
}
