using AutoMapper;
using Microsoft.AspNetCore.Http;
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
        public GoodsServices( IMapper mapper ,OnlinePosContext onlinePosContext)
        {
            _mapper = mapper;
            _onlinePosContext = onlinePosContext;
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

        public async Task<IEnumerable<TblGoodsgroup>> GetGoodsByGroupAsync(string store_id, string group_id)
        {
            return await _onlinePosContext.TblGoodsgroups
                .Where(s => s.StoreId == store_id && s.GroupId == group_id)
                .Include(s => s.TblGoods)
                .ToListAsync();
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

        public async Task<IEnumerable<string?>> GetGoodsUnitAsync(string store_id, string goods_id, int type)
        {
            return await _onlinePosContext.TblGoodsunits
                .Where(s => s.StoreId == store_id && s.GoodsId == goods_id && s.UnitStatus == type)
                .Select(s => s.GoodsUnit)
                .ToListAsync();
        }

        public async Task SaveGoodsGroup(GoodsGroupDTO goodsGroupDTO)
        {
            var entity = _mapper.Map<TblGoodsgroup>(goodsGroupDTO);
            var groupCounter = GenerateGoodGroupID(entity.StoreId);
            entity.GroupCounter = GetGroupCounterByStoreId(entity.StoreId) + 1;
            entity.GroupId = groupCounter;
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
            entity.GoodsId = entity.StoreId + goodsCounter;
            entity.GoodsCounter = GetGoodsCounterByStoreId(entity.StoreId) + 1;
            string imageData = await SaveImage(imageFile, entity.StoreId, goodsCounter);
            entity.Picture = imageData;
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

        public async Task SaveSellingPrices(TblSellprice tblSellprice)
        {
            _onlinePosContext.TblSellprices
                .Add(tblSellprice);
            await _onlinePosContext.SaveChangesAsync();
        }
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

        public async Task<string> SaveImage(IFormFile image, string id, string idenID)
        {
            
            string filename = "";
            var type = "stores";
            var filepath = Path.Combine("wwwroot", "image", $"{type}\\{id}");

            if (!Directory.Exists(filepath))
            {
                Directory.CreateDirectory(filepath);
            }

            try
            {
                var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
                if (extension == ".jpg" || extension == ".jpeg" || extension == ".png")
                {
                    filename = $"{id}{idenID}{extension}";
                }
                else
                {
                    throw new NotSupportedException("Image format not supported.");
                }
                var exactpath = Path.Combine(filepath, filename);
                using (var stream = new FileStream(exactpath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving image: {ex.Message}");
                throw;
            }
            return filename;
        }

        public async Task<byte[]> GetImage(string id, string idenID)
        {
            var filepath = Path.Combine("wwwroot", "image", "stores", id, id + idenID);
            var extensions = new[] { ".jpg", ".jpeg", ".png" };
            
            foreach (var extension in extensions)
            {
                var fullPath = Path.Combine(filepath + extension);
                if (File.Exists(fullPath))
                {
                    var bytes = await File.ReadAllBytesAsync(fullPath);
                    return bytes;
                }
            }
                throw new FileNotFoundException("Image not found", filepath);           
        }
    }
}
