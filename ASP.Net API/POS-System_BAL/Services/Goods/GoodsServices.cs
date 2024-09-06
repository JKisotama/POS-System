using POS_System_DAL.Data;
using POS_System_DAL.Models;
using POS_System_DAL.Repository.Goods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Goods
{
    public class GoodsServices : IGoodsServices
    {

        private readonly IGoodsRepository _goodsRepository;

        public GoodsServices( IGoodsRepository goodsRepository)
        {
            _goodsRepository = goodsRepository;
        }

        public async Task<IEnumerable<TblGoodsgroup>> GetTblGoodsgroupsAsync(string store_id)
        {
            return await _goodsRepository.GetAllGroup(store_id);
        }

        public async Task GetGroupAsync(string store_id, string group_id)
        {
            await _goodsRepository.GetGroup(store_id, group_id);
        }

        public async Task<IEnumerable<TblGood>> GetGoodsByGroupAsync(string store_id, string group_id)
        {
            return await _goodsRepository.GetGoodsByGroup(store_id, group_id);
        }

        public async Task<IEnumerable<TblPropertygroup>> GetAllPropertyGroupAsync(string store_id)
        {
            return await _goodsRepository.GetAllPropertyGroup(store_id);
        }

        public async Task GetPropertyGroupAsync(string store_id, string property_id)
        {
            await _goodsRepository.GetPropertyGroup(store_id, property_id);
        }

        public async Task GetGoodsAsync(string store_id, string goods_id)
        {
            await _goodsRepository.GetGoods(store_id, goods_id);
        }

        public async Task<IEnumerable<string?>> GetGoodsUnitAsync(string store_id, string goods_id, int type)
        {
            return await _goodsRepository.GetGoodUnit(store_id, goods_id, type);
        }

        public async Task SaveUnit(string store_id, string goods_id, int applied_type, string unit_name, int sku, int size)
        {
            var newUnit = new TblGoodsunit
            {
                StoreId = store_id,
                GoodsId = goods_id,
                UnitStatus = applied_type,
                GoodsUnit = unit_name,
                UnitStock = sku,
                UnitSize = size
            };
           await _goodsRepository.Add(newUnit);

        }

        public async Task SaveProperty(string store_id, string goods_id, string property_id, string property_value)
        {
            var newProperty = new TblGoodsproperty
            {
                StoreId = store_id,
                GoodsId = goods_id,
                PropertyId = property_id,
                PropertyName = property_value
            };
            await _goodsRepository.SaveProperty(newProperty);
        }
        public string GenerateGoodGroupID(string store_id)
        {
            int counter = _goodsRepository.GetGroupCounterByStoreId(store_id);
            string group_id = new string('0', 3 - counter.ToString().Length);
            return group_id;
        }

        public string GenerateGoodId(string store_id, string goodgroup_id)
        {
            int counter = _goodsRepository.GetGoodsCounterByStoreId(store_id);
            string group_id = new string('0', 3 - counter.ToString().Length);
            return group_id;
        }

        public string GenerateGoodGroupProperty(string store_id)
        {
            int counter = _goodsRepository.GetGoodsCounterByStoreId(store_id);
            string group_id = new string('0', 3 - counter.ToString().Length);
            return group_id;
        }
    }
}
