using AutoMapper;
using POS_System_BAL.DTOs;
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
        private readonly ISupplierRepository _supplierRepository;
        private readonly IMapper _mapper;

        public SupplierServices(ISupplierRepository supplierRepository, IMapper mapper)
        {
            _supplierRepository = supplierRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TblSupplier>> GetAllSupplier(string store_id)
        {
            if (true)
            {
                await _supplierRepository.GettAllAsync(s => s.StoreId == store_id);
            }
            return null;
        }

        public async Task<TblSupplier> GetSupplier(string store_id, string supplier_id)
        {
            return await _supplierRepository.GetAsync(s => s.StoreId == store_id && s.SupplierId == supplier_id);
        }

        public async Task<TblSupplier> CreateSupplier(TblSupplier supplier)
        {
            return await _supplierRepository.AddAsync(supplier);
        }

        public async Task UpdateSupplier(SupplierDTO supplierDTO)
        {
            var existSupplier = await GetSupplier(supplierDTO.StoreId, supplierDTO.SupplierId);
            if (existSupplier != null)
            {
                _mapper.Map(supplierDTO, existSupplier);
                await _supplierRepository.UpdateAsync(existSupplier);
                
            }
            throw new InvalidOperationException("No Supplier found");
        }

        public async Task<TblSupplier> DeleteAsync(string store_id, string supplier_id)
        {
            var supplier = await GetSupplier(store_id, supplier_id);
            if (supplier != null)
            {
               await _supplierRepository.DeleteAsync(supplier);
               return supplier;
            }
            throw new InvalidOperationException("no Supplier Found");
        }
    }
}
