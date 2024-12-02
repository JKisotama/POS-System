using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_DAL;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace POS_System_BAL.Services.Goods
{
    public class GoodsServices : IGoodsServices
    {
        private readonly IMapper _mapper;
        private readonly OnlinePosContext _onlinePosContext;
        private readonly Cloudinary _cloudinary;
        public GoodsServices( IMapper mapper ,OnlinePosContext onlinePosContext, Cloudinary cloudinary)
        {
            _mapper = mapper;
            _onlinePosContext = onlinePosContext;
            _cloudinary = cloudinary;
        }

        #region GET
        public IQueryable<TblGood> GetGoodsQueryable()
        {
            return _onlinePosContext.TblGoods.AsQueryable();
        }
        public IQueryable<TblSellprice> GetSelPriceQueryable()
        {
            return _onlinePosContext.TblSellprices.AsQueryable();
        }
        public async Task<IEnumerable<TblGoodsgroup>> GetTblGoodsgroupsAsync(string store_id)
        {
            return await _onlinePosContext.TblGoodsgroups
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }

        public async Task<TblGoodsgroup> GetGroupAsync(string store_id, string group_id)
        {
            var groupList = await _onlinePosContext.TblGoodsgroups
                .Where(s => s.StoreId == store_id && s.GroupId == group_id)
                .FirstOrDefaultAsync();
            return groupList;
        }

        public async Task<IEnumerable<TblGood>> GetGoodsByGroupAsync(
            IQueryable<TblGood> query,
            string store_id = null,
            string group_id = null,  
            string searchTerm = null)
        {
            
            // var goods = await query.Include(g =>g.Group)
            //     .Where(g => string.IsNullOrEmpty(store_id) || g.StoreId.Contains(store_id))
            //     .Where(g => string.IsNullOrEmpty(group_id) || g.Group.GroupId == group_id)
            //     .Where(g => string.IsNullOrEmpty(searchTerm) ||
            //     (g.GoodsBrand != null && g.GoodsBrand.Contains(searchTerm) == true || 
            //      g.GoodsName.Contains(searchTerm)))
            //     .ToListAsync();
            // return goods;
            var goods = await _onlinePosContext.TblGoods
                .Where(g => string.IsNullOrEmpty(store_id) || g.StoreId == store_id)
                .Where(g => string.IsNullOrEmpty(group_id) || g.GroupId == group_id)
                .ToListAsync();
            return goods;

        }

        public async Task<IEnumerable<TblPropertygroup>> GetAllPropertyGroupAsync(string store_id)
        {
            return await _onlinePosContext.TblPropertygroups
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }

        public async Task<TblPropertygroup> GetPropertyGroupAsync(string store_id,string property_id)
        {
            var property = await _onlinePosContext.TblPropertygroups
                .Where(s => s.StoreId == store_id && s.PropertyId == property_id)
                .FirstOrDefaultAsync();
            return property;
        }

        public async Task<TblGood> GetGoodsAsync(string store_id, string goods_id)
        {
            var goods = await _onlinePosContext.TblGoods
                .Where(s => s.StoreId == store_id && s.GoodsId == goods_id)
               .FirstOrDefaultAsync();
            return goods;
        }

        public async Task<IEnumerable<GoodUnitDTO>> GetGoodsUnitAsync(string store_id, string goods_id, int type)
        {
            var entity = await _onlinePosContext.TblGoodsunits
                .Where(s => s.StoreId == store_id && s.GoodsId == goods_id && s.UnitStatus == type)
                .ToListAsync();
            return _mapper.Map<IEnumerable<GoodUnitDTO>>(entity);
        }
        public async Task<IEnumerable<TblGoodsproperty>> GetGoodsPropertyAsync(
            string store_id, 
            string goods_id, 
            string property_group, 
            string user_language = null)
        {
            return await _onlinePosContext.TblGoodsproperties
                .Where(s => s.StoreId == store_id && s.GoodsId == goods_id && s.PropertyId == property_group)
                .ToListAsync();
        }
        public async Task<IEnumerable<GoodsWithSellPriceDTO>> GetGoodsWithSellPricesAsync(
        IQueryable<TblGood> query,
        IQueryable<TblSellprice> sellPriceQuery, 
        string store_id = null,
        string searchTerm = null,
        int? sellNumber = null,
        int? sellPrice = null)
        {
            var filteredGoods = query
                .Where(g =>
                    (string.IsNullOrEmpty(store_id) || 
                        g.StoreId.Contains(store_id)) &&
                    (string.IsNullOrEmpty(searchTerm) || 
                        g.GoodsName.Contains(searchTerm) || 
                        g.GoodsId.Contains(searchTerm)));
            var filteredSellPrice = sellPriceQuery
                .Where(s =>
                (string.IsNullOrEmpty(searchTerm) || 
                    s.Barcode.Contains(searchTerm) || 
                    s.GoodsUnit.Contains(searchTerm) &&
                (!sellNumber.HasValue || s.SellNumber == sellNumber) &&
                (!sellPrice.HasValue || s.SellPrice == sellPrice)));

            var result = await filteredSellPrice
                .GroupJoin(
                    sellPriceQuery,
                    good => good.GoodsId,
                    sellPrice => sellPrice.GoodsId,
                    (good, sellPrices) => new GoodsWithSellPriceDTO
                    {
                        StoreId = good.StoreId,
                        GoodsId = good.GoodsId,
                        GoodsName = good.Goods.GoodsName,
                        Barcode = good.Barcode,
                        GoodsUnit = good.GoodsUnit,
                        SellNumber = sellPrices.FirstOrDefault().SellNumber, 
                        SellPrice = sellPrices.FirstOrDefault().SellPrice
                    })
                .ToListAsync();

            return result;
        }

        public async Task<IEnumerable<TblSellprice>> GetSellpricesAsync(
            string store_id, 
            string goods_id, 
            string unit, 
            int quantity)
        {
            return await _onlinePosContext.TblSellprices
                .Where(s => s.StoreId == store_id && s.GoodsId == goods_id && s.GoodsUnit == unit && s.SellNumber == quantity)
                .ToListAsync();
        }

        #endregion

        #region CREATE
        public async Task SaveGoodsGroup(GoodsGroupDTO goodsGroupDTO)
        {
            var entity = _mapper.Map<TblGoodsgroup>(goodsGroupDTO);
            var groupCounter = GenerateGoodGroupID(entity.StoreId);
            entity.GroupCounter = GetGroupCounterByStoreId(entity.StoreId) + 1;
            entity.GroupId = entity.StoreId + groupCounter;
            _onlinePosContext.TblGoodsgroups
                .Add(entity);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task SavePropertyGroup(TblPropertygroup tblPropertygroup)
        {
            var propertyCounter = GenerateGoodGroupProperty(tblPropertygroup.StoreId);
            tblPropertygroup.PropertyId = tblPropertygroup.StoreId + propertyCounter;
            tblPropertygroup.PropertyCounter = GetPropertyCounterByStoreId(tblPropertygroup.StoreId) + 1;
            _onlinePosContext.TblPropertygroups
                .Add(tblPropertygroup);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task SaveGoods(GoodsDTO goodsDTO, IFormFile imageFile)
        {
            
                var entity = _mapper.Map<TblGood>(goodsDTO);
                var goodsCounter = GenerateGoodId(entity.StoreId);
                entity.GoodsId = entity.StoreId + entity.GroupId + goodsCounter;
                entity.GoodsCounter = GetGoodsCounterByStoreId(entity.StoreId) + 1;
                var imageName = $"{entity.StoreId}-{entity.GroupId}-{goodsCounter}";
                var uploadResult = await UploadImageToCloudinary(imageFile, entity.StoreId, goodsCounter, imageName);
                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                entity.Picture = uploadResult.SecureUrl.ToString();

                _onlinePosContext.TblGoods.Add(entity);
                await _onlinePosContext.SaveChangesAsync();

            
        }

        public async Task SaveUnit(GoodUnitDTO goodUnitDTO)
        {
            var entity = _mapper.Map<TblGoodsunit>(goodUnitDTO);
            _onlinePosContext.TblGoodsunits
                .Add(entity);
            await _onlinePosContext.SaveChangesAsync();
        }


        public async Task SaveProperty(string store_id, string goods_id, string property_id, string property_value)
        {
            try
            {
                var newProperty = new TblGoodsproperty
                {
                    StoreId = store_id,
                    GoodsId = goods_id,
                    PropertyId = property_id,
                    PropertyName = property_value
                };
                _onlinePosContext.TblGoodsproperties
                    .Add(newProperty);
                await _onlinePosContext.SaveChangesAsync();
            }
            catch(DbUpdateException ex)
            {
                if(ex.InnerException is SqlException sqlException)
                {
                        throw new Exception("Check Property ID !");            
                }
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while saving the property.", ex);
            }
        }

        public async Task SaveSellingPrices(TblSellprice tblSellprice)
        {
            string? storeId = _onlinePosContext.TblGoods
                        .Where(g => g.GoodsId == tblSellprice.GoodsId)
                        .Select(g => g.StoreId)
                        .FirstOrDefault();
            if (storeId != null)
            {
                tblSellprice.StoreId = storeId;
            }
            else
            {
                throw new InvalidOperationException("No store ID found for goods ID");
            }
            _onlinePosContext.TblSellprices
                .Add(tblSellprice);
            await _onlinePosContext.SaveChangesAsync();
        }
        #endregion

        #region AUTO GEN
        public string GenerateGoodGroupID(string store_id)
        {
            int counter = GetGroupCounterByStoreId(store_id);
            var  nCounter =   counter + 1;
            string group_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return group_id;
        }

        public string GenerateGoodId(string store_id)
        {
            int counter = GetGoodsCounterByStoreId(store_id);
            var nCounter = counter + 1;
            string good_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return good_id;
        }

        public string GenerateGoodGroupProperty(string store_id)
        {
            int counter = GetPropertyCounterByStoreId(store_id);
            var nCounter = counter + 1;
            string group_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return group_id;
        }

        public int GetGroupCounterByStoreId(string storerId)
        {
            var groupCounter = _onlinePosContext.TblGoodsgroups
                .Where(g => g.StoreId == storerId)
                .OrderBy(g => g.StoreId)
                .ThenByDescending(g => g.GroupCounter)
                .Select(g => g.GroupCounter)
                .FirstOrDefault();
                return groupCounter;
        }

        public int GetGoodsCounterByStoreId(string storeId)
        {
                var goodsCounter = _onlinePosContext.TblGoods
                    .Where(g => g.StoreId == storeId)
                    .OrderBy(g => g.StoreId)
                    .ThenByDescending (g => g.GoodsCounter)
                    .Select(g => g.GoodsCounter)
                    .FirstOrDefault();
                return goodsCounter;            
        }

        public int GetPropertyCounterByStoreId(string storeId)
        {
                var propertyCounter = _onlinePosContext.TblPropertygroups
                    .Where(g => g.StoreId == storeId)
                    .OrderBy(g => g.StoreId)
                    .ThenByDescending(g => g.PropertyCounter)
                    .Select(g => g.PropertyCounter)
                    .FirstOrDefault();
                return propertyCounter;
        }
        #endregion

        
        public async Task UpdateGoodsImage(string storeId, string goodsId, IFormFile imageFile)
        {
            // Retrieve the existing goods entity from the database
            var existingGoods = await _onlinePosContext.TblGoods
                .FirstOrDefaultAsync(g => g.GoodsId == goodsId && g.StoreId == storeId);

            if (existingGoods == null)
            {
                throw new KeyNotFoundException("Goods not found.");
            }
            
            if (imageFile != null)
            {
                var goodsCounter = GenerateGoodId(existingGoods.StoreId);
                var imageName = $"{existingGoods.StoreId}-{existingGoods.GroupId}-{goodsCounter}";
                var uploadResult = await UploadImageToCloudinary(imageFile, existingGoods.StoreId, goodsCounter.ToString(), imageName);

                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                // Update the Picture property with the new image URL
                existingGoods.Picture = uploadResult.SecureUrl.ToString();
            }

            // Save changes to the database
            await _onlinePosContext.SaveChangesAsync();
        }
        
        private async Task<ImageUploadResult> UploadImageToCloudinary(
            IFormFile imageFile,
            string id,
            string idenID,
            string imageName)
        {
            var uploadResult = new ImageUploadResult();

            if (imageFile.Length > 0)
            {
                using (var stream = imageFile.OpenReadStream())
                {
                    var filePath = $"{id}/{idenID}";
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(imageFile.FileName, stream),
                        PublicId = filePath,
                        Transformation = new Transformation().Crop("fill").Gravity("face").Width(500).Height(500)
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            return uploadResult;
        }

    }
}
