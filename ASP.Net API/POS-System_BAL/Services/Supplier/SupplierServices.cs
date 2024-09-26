using AutoMapper;
using POS_System_BAL.DTOs;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using POS_System_DAL.Repository.Supplier;
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

        public async Task<IEnumerable<TblSupplier>> GetAllSupplier(string store_id)
        {
            if (true)
            {
                await _onlinePosContext.TblSuppliers.FindAsync();
            }
            return null;
        }

        public async Task<TblSupplier> GetSupplier(string store_id, string supplier_id)
        {
            return null;
        }

        public async Task CreateSupplier(SupplierDTO supplier)
        {
            var entity = _mapper.Map<TblSupplier>(supplier);
            var supplierCounter = GenerateSupplierID(entity.StoreId, entity.CreatedDate);
            entity.SupplierCounter = GetSupplierCounterByStoreId(entity.StoreId, entity.CreatedDate) + 1;
            entity.SupplierId = entity.StoreId + supplierCounter;
            _onlinePosContext.TblSuppliers
                .Add(entity);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task UpdateSupplier(SupplierDTO supplierDTO)
        {
            var existSupplier = await GetSupplier(supplierDTO.StoreId, supplierDTO.SupplierId);
            if (existSupplier != null)
            {
                _mapper.Map(supplierDTO, existSupplier);
                 _onlinePosContext.Update(existSupplier);
                
            }
            throw new InvalidOperationException("No Supplier found");
        }

        public string GenerateSupplierID(string store_id, DateTime created_date)
        {
            int counter = GetSupplierCounterByStoreId(store_id, created_date);
            var nCounter = counter + 1;
            string supplier_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return supplier_id;
        }



        public int GetSupplierCounterByStoreId(string storeId, DateTime created_Date)
        {
                var supplierCounetr = _onlinePosContext.TblSuppliers
                    .Where(g => g.StoreId == storeId && g.CreatedDate.Date == created_Date.Date)
                    .OrderBy(g => g.StoreId)
                    .ThenByDescending(g => g.SupplierCounter)
                    .Select(g => g.SupplierCounter)
                    .FirstOrDefault();
                return supplierCounetr;
        }

        public async Task<TblSupplier> DeleteAsync(string store_id, string supplier_id)
        {
            var supplier = await GetSupplier(store_id, supplier_id);
            if (supplier != null)
            {
               _onlinePosContext.Remove(supplier);
               return supplier;
            }
            throw new InvalidOperationException("no Supplier Found");
        }
    }
}
