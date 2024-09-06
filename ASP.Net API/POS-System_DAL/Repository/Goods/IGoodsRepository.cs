using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Goods
{
    public interface IGoodsRepository : IGenericRepository<TblGoodsunit>
    {
        Task<IEnumerable<TblGoodsgroup>> GetAllGroup(string store_id);
        Task GetGroup(string store_id, string group_id);
        Task<IEnumerable<TblGood>> GetGoodsByGroup(string store_id, string group_id);
        Task<IEnumerable<TblPropertygroup>> GetAllPropertyGroup(string store_id);
        Task GetPropertyGroup(string store_id, string property_id);
        Task GetGoods(string store_id, string goods_id);
        Task<IEnumerable<string?>> GetGoodUnit(string store_id, string goods_id, int type);
        Task SaveGoodsGroup(string store_id, TblGoodsgroup tblGoodsgroup);
        Task SavePropertyGroup(string store_id, TblPropertygroup tblPropertygroup);
        Task SaveGoods(string store_id, TblGood tblGoods);
        Task SaveUnit(TblGoodsunit tblGoodsunit);
        Task SaveProperty(TblGoodsproperty tblGoodsproperty);
        Task SaveSellingPrices(TblSellprice tblSellprice);
        public int GetGroupCounterByStoreId(string storerId);
        public int GetGoodsCounterByStoreId(string storeId);
        public int PropertyCounterByStoreId(string storeId);
    }
}
