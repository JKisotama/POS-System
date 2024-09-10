using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Goods
{
    public class GoodsRepository : GenericRepository<TblGoodsunit>,IGoodsRepository
    {
        private OnlinePosContext _onlinePosContext;

        public GoodsRepository(OnlinePosContext onlinePosContext): base(onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }

        public async Task<IEnumerable<TblGoodsgroup>> GetAllGroup(string store_id)
        {
            return await _onlinePosContext.TblGoodsgroups
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }

        public async Task GetGroup(string store_id, string group_id)
        {
            _onlinePosContext.TblGoodsgroups
                .Where(s => s.StoreId == store_id && s.GroupId == group_id)
                .FirstOrDefault();
        }

        public async Task<IEnumerable<TblGood>> GetGoodsByGroup(string store_id, string group_id)
        {
            return await _onlinePosContext.TblGoods
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }

        public async Task<IEnumerable<TblPropertygroup>> GetAllPropertyGroup(string store_id)
        {
            return await _onlinePosContext.TblPropertygroups
                .Where(s => s.StoreId ==store_id)
                .ToListAsync();
        }

        public async Task GetPropertyGroup(string store_id, string property_id)
        {
            _onlinePosContext.TblPropertygroups
                .Where(s => s.StoreId == store_id && s.PropertyId == property_id)
                .FirstOrDefault();
        }

        public async Task GetGoods(string store_id, string goods_id)
        {
             _onlinePosContext.TblGoods
                .Where(s => s.StoreId == store_id && s.GoodsId == goods_id)
                .FirstOrDefault();
        }

        

        public async Task<IEnumerable<string?>> GetGoodUnit(string store_id, string goods_id, int type)
        {
                return await _onlinePosContext.TblGoodsunits
                .Where(s => s.StoreId == store_id && s.GoodsId == goods_id && s.UnitStatus == type)
                .Select(s => s.GoodsUnit)
                .ToListAsync(); 
        }

        public async Task SaveGoodsGroup(string store_id, TblGoodsgroup tblGoodsgroup)
        {
            _onlinePosContext.TblGoodsgroups
                .Add(tblGoodsgroup); // thiếu store_id
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task SavePropertyGroup(string store_id, TblPropertygroup tblPropertygroup)
        {
            // thiếu store_id
            _onlinePosContext.TblPropertygroups
                .Add(tblPropertygroup);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task SaveGoods(string store_id, TblGood tblGoods)
        {
            _onlinePosContext.TblGoods
                .Add(tblGoods);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task SaveUnit(TblGoodsunit tblGoodsunit)
        {
            _onlinePosContext.TblGoodsunits.Add(tblGoodsunit);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task SaveProperty(TblGoodsproperty tblGoodsproperty)
        {
            _onlinePosContext.TblGoodsproperties
                .Add(tblGoodsproperty);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task SaveSellingPrices(TblSellprice tblSellprice)
        {
            _onlinePosContext.TblSellprices
                .Add(tblSellprice);
            await _onlinePosContext.SaveChangesAsync();
        }

        public int GetGroupCounterByStoreId(string storerId)
        {
            using ( _onlinePosContext = new OnlinePosContext() )
            {
                var groupCounter = _onlinePosContext.TblGoodsgroups
                    .Where( g => g.StoreId == storerId )
                    .Select( g => g.GroupCounter )
                    .FirstOrDefault();
                return (int)groupCounter;
            }
        }

        public int GetGoodsCounterByStoreId(string storeId)
        {
            using ( _onlinePosContext = new OnlinePosContext() )
            {
                var goodsCounter = _onlinePosContext.TblGoods
                    .Where( g => g.StoreId == storeId )
                    .Select( g => g.GoodsCounter )
                    .FirstOrDefault();
                return (int)goodsCounter;
            }
        }

        public int PropertyCounterByStoreId(string storeId)
        {
            using ( _onlinePosContext = new OnlinePosContext() )
            {
                var propertyCounter = _onlinePosContext.TblPropertygroups
                    .Where( g => g.StoreId == storeId )
                    .Select( g => g.PropertyCounter )
                    .FirstOrDefault();
                return (int)propertyCounter;
            }
        }

    }
}
