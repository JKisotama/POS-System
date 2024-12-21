using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Supplier
{
    public class SupplierServices : ISupplierServices
    {
        private readonly OnlinePosContext _onlinePosContext;
        private readonly IMapper _mapper;

        public SupplierServices(OnlinePosContext onlinePosContext, IMapper mapper)
        {
            _onlinePosContext = onlinePosContext;
            _mapper = mapper;
        }

        public IQueryable<TblSupplier> GetSuppliersQueryable()
        {
            return _onlinePosContext.TblSuppliers.AsQueryable();
        }

        #region GET

        public async Task<IEnumerable<TblSupplier>> GetAllSupplier(IQueryable<TblSupplier> query, string store_id, string supplier_name = null)
        {
            return await _onlinePosContext.TblSuppliers.
                Where(s => s.StoreId == store_id)
                .Where(s => string.IsNullOrEmpty(supplier_name) || s.SupplierName.Contains(supplier_name))
                .Include(s =>s.TblGoodssupplieds)
                .ToListAsync();
        }

        public async Task<TblSupplier> GetSupplier(string store_id, string supplier_id)
        {
            var supplierList = await _onlinePosContext.TblSuppliers
                .Where(s => s.StoreId == store_id && s.SupplierId == supplier_id)
                .Include(s => s.TblGoodssupplieds)
                .FirstOrDefaultAsync();
            return supplierList;
        }


        #endregion

        #region POST

        public async Task CreateSupplier(SupplierDTO supplier)
        {
            var entity = _mapper.Map<TblSupplier>(supplier);
            var supplierCounter = GenerateSupplierID(entity.StoreId);
            entity.SupplierCounter = GetSupplierCounterByStoreId(entity.StoreId) + 1;
            entity.SupplierId = entity.StoreId + supplierCounter;
            _onlinePosContext.TblSuppliers
                .Add(entity);
            await _onlinePosContext.SaveChangesAsync();
        }

        #endregion

        #region PUT

        public async Task UpdateSupplier(
            string storeId, string supplierId, 
            string supplierName, int type, 
            string address, string phone, 
            string email, int allowDebt)
        {
            var existSupplier = await _onlinePosContext.TblSuppliers
                .FirstOrDefaultAsync(p => p.StoreId == storeId && p.SupplierId == supplierId);
            if (existSupplier == null)
            {
                throw new InvalidOperationException("No Supplier found");
            }

            existSupplier.SupplierName = supplierName;
            existSupplier.SupplierType = type;
            existSupplier.SupplierAddress = address;
            existSupplier.SupplierPhone = phone;
            existSupplier.SupplierEmail = email;
            existSupplier.AllowDebt = allowDebt;
            
            _onlinePosContext.Update(existSupplier);
            await _onlinePosContext.SaveChangesAsync();
        }


        #endregion

        #region DELETE

        public async Task<TblSupplier> DeleteSupplierAsync(string store_id, string supplier_id)
        {
            var supplier = await GetSupplier(store_id, supplier_id);
            if (supplier != null)
            {
                _onlinePosContext.TblSuppliers.Remove(supplier);
                await _onlinePosContext.SaveChangesAsync();
                return supplier;
            }
            throw new InvalidOperationException("no Supplier Found");
        }

        #endregion

        #region AUTO-GEN

        public string GenerateSupplierID(string store_id)
        {
            int counter = GetSupplierCounterByStoreId(store_id);
            var nCounter = counter + 1;
            string supplier_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return supplier_id;
        }



        public int GetSupplierCounterByStoreId(string storeId)
        {
            var supplierCounetr = _onlinePosContext.TblSuppliers
                .Where(g => g.StoreId == storeId )
                .OrderBy(g => g.StoreId)
                .ThenByDescending(g => g.SupplierCounter)
                .Select(g => g.SupplierCounter)
                .FirstOrDefault();
            return supplierCounetr;
        }

        #endregion
       

        
    }
}
