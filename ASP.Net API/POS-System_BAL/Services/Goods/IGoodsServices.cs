﻿using Microsoft.AspNetCore.Http;
using POS_System_BAL.DTOs;
using POS_System_DAL.Data;
using POS_System_DAL.Models;


namespace POS_System_BAL.Services.Goods
{
    public interface IGoodsServices
    {
        #region GET
        IQueryable<TblGood> GetGoodsQueryable();
        IQueryable<TblSellprice> GetSelPriceQueryable();
        Task<IEnumerable<TblGoodsgroup>> GetTblGoodsgroupsAsync(string store_id);
        Task<TblGoodsgroup> GetGroupAsync(string store_id, string group_id);
        Task<IEnumerable<TblGood>> GetGoodsByGroupAsync(
            IQueryable<TblGood> query, 
            string store_id, 
            string group_id, 
            string searchTerm = null);
        Task<IEnumerable<TblPropertygroup>> GetAllPropertyGroupAsync(string store_id);
        Task<TblPropertygroup> GetPropertyGroupAsync(string store_id, string property_id);
        Task<TblGood> GetGoodsAsync(string store_id, string goods_id);
        Task<IEnumerable<GoodUnitDTO>> GetGoodsUnitAsync(string store_id, string goods_id, int type);
        Task<IEnumerable<TblGoodsproperty>> GetGoodsPropertyAsync(
            string store_id, 
            string property_group);


        Task<TblGoodsproperty> GetGoodsPropertySpecificAsync(
            string storeId,
            string goodsId,
            string propertyName);

        Task<IEnumerable<TblGoodsproperty>> GetGoodsPropertyByIdAsync(
            string store_id,
            string goods_id);
        Task<IEnumerable<GoodsWithSellPriceDTO>> GetGoodsWithSellPricesAsync(
            IQueryable<TblGood> query,
            IQueryable<TblSellprice> sellPriceQuery,
            string store_id = null,
            string searchTerm = null,
            int? sellNumber = null,
            int? sellPrice = null);
        Task<IEnumerable<TblSellprice>> GetSellpricesAsync(string store_id, string goods_id);

        Task<IEnumerable<TblGood>> GetAllGoodsAsync(string store_id);
        Task<IEnumerable<TblGoodsgroup>> GetAllGroupAsync(string store_id);
        Task<IEnumerable<TblPropertygroup>> GetAllGroupPropertyAsync(string store_id);
        Task<IEnumerable<TblGoodsproperty>> GetAllGoodsPropertyAsync(string store_id);
        Task<IEnumerable<TblGoodsunit>> GetAllGoodsUnitAsync(string store_id);
        Task<IEnumerable<TblSellprice>> GetAllSellPriceAsync(string store_id);
        
        #endregion

        #region POST
        Task SaveGoodsGroup(GoodsGroupDTO goodsGroupDTO);
        Task SavePropertyGroup(TblPropertygroup tblPropertygroup);
        Task SaveSellingPrices(TblSellprice tblSellprice);
        Task SaveUnit(GoodUnitDTO goodUnitDTO);
        Task SaveGoods(GoodsDTO goodsDTO, IFormFile imageFile);
        Task SaveProperty(string store_id, string goods_id, string property_id, string property_value);
        #endregion

        #region UPDATE

        Task UpdateGoods(string storeId, string goodsId, string goodsName, string goodsBrand, int goodsStatus, IFormFile imageFile);
        Task UpdateGroup(string storeId, string groupId, string groupName, int groupStatus);
        Task UpdateGoodsProperty(string goodsPropertyId, string updateProperty);
        Task UpdateGroupProperty(string storeId, string propertyId, string propertyName);
        Task UpdateGoodsUnit(string storeId, string goodsId, string goodsUnit, int size, int status, int stock);
        Task UpdateSellingPrices(string storeId, string goodsId, string barcode, string goodsUnit, int price, int sku);
        
        #endregion

        #region DELETE

        Task DeleteGoods(string storeId, string goodsId);
        Task DeleteGroup(string storeId, string groupId);
        Task DeleteGoodsProperty(string storeId, string goodsPropertyId);
        Task DeleteGroupProperty(string storeId, string propertyId);

        Task DeleteGoodsUnit(string storeId, string goodsUnit);
        Task DeleteSellPrice(string storeId, string goodsId, string goodsUnit);

        #endregion
        
    }
}
