using Microsoft.AspNetCore.Http;
using POS_System_BAL.DTOs;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Goods
{
    public interface IGoodsServices
    {
        Task<IEnumerable<TblGoodsgroup>> GetTblGoodsgroupsAsync(string store_id);
        Task<TblGoodsgroup> GetGroupAsync(string store_id, string group_id);
        Task<IEnumerable<TblGood>> GetGoodsByGroupAsync(string store_id, string group_id);
        Task<IEnumerable<TblPropertygroup>> GetAllPropertyGroupAsync(string store_id);
        Task<TblPropertygroup> GetPropertyGroupAsync(string store_id, string property_id);
        Task<TblGood> GetGoodsAsync(string store_id, string goods_id);
        Task<IEnumerable<string?>> GetGoodsUnitAsync(string store_id, string goods_id, int type);
        Task SaveGoodsGroup(GoodsGroupDTO goodsGroupDTO);
        Task SavePropertyGroup(TblPropertygroup tblPropertygroup);
        Task SaveSellingPrices(TblSellprice tblSellprice);
        Task SaveUnit(GoodUnitDTO goodUnitDTO);
        Task SaveGoods(GoodsDTO goodsDTO, IFormFile imageFile);
        Task SaveProperty(string store_id, string goods_id, string property_id, string property_value);
        string GenerateGoodGroupID(string store_id);
        string GenerateGoodId(string store_id, string goodgroup_id);
        string GenerateGoodGroupProperty(string store_id);
        int GetGroupCounterByStoreId(string storerId);
        int GetGoodsCounterByStoreId(string storeId);
        int PropertyCounterByStoreId(string storeId);
        Task<string> SaveImage(IFormFile image, string id, string idenID);
        Task<byte[]> GetImage(string id, string idenID);
    }
}
