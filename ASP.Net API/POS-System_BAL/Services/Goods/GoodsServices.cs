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

namespace POS_System_BAL.Services.Goods
{
    public class GoodsServices : IGoodsServices
    {
        private readonly IMapper _mapper;
        private readonly OnlinePosContext _onlinePosContext;
        private readonly Cloudinary _cloudinary;

        public GoodsServices(IMapper mapper, OnlinePosContext onlinePosContext, Cloudinary cloudinary)
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

        public async Task<TblPropertygroup> GetPropertyGroupAsync(string store_id, string property_id)
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
            string property_group)
        {
            return await _onlinePosContext.TblGoodsproperties
                .Where(s => s.StoreId == store_id && s.PropertyId == property_group)
                .Distinct()
                .ToListAsync();
        }
        
        public async Task<TblGoodsproperty> GetGoodsPropertySpecificAsync(
            string storeId,
            string goodsId,
            string propertyName)
        {
            var result = await _onlinePosContext.TblGoodsproperties
                .Where(s => s.StoreId == storeId && s.GoodsId == goodsId && s.PropertyName == propertyName)
                .FirstOrDefaultAsync();
            return result;
        }

        public async Task<IEnumerable<TblGoodsproperty>> GetGoodsPropertyByIdAsync(
            string store_id,
            string goods_id)
        {
            var result = await _onlinePosContext.TblGoodsproperties
                .AsNoTracking()
                .Join(
                    _onlinePosContext.TblPropertygroups,
                    gp => gp.PropertyId,
                    pg => pg.PropertyId,
                    (gp, pg) => gp
                )
                .Where(gp => gp.StoreId == store_id && gp.GoodsId == goods_id)
                .Distinct()
                .ToListAsync();

            return result;
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
            string goods_id)
        {
            return await _onlinePosContext.TblSellprices
                .Where(s => s.StoreId == store_id && s.GoodsId == goods_id)
                .ToListAsync();
        }


        public async Task<IEnumerable<TblGood>>GetAllGoodsAsync(string store_id)
        {
            return await _onlinePosContext.TblGoods
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }

        public async Task<IEnumerable<TblGoodsgroup>>GetAllGroupAsync(string store_id)
        {
            return await _onlinePosContext.TblGoodsgroups
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }
        
        public async Task<IEnumerable<TblPropertygroup>> GetAllGroupPropertyAsync(string store_id)
        {
            return await _onlinePosContext.TblPropertygroups
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }
        
        public async Task<IEnumerable<TblGoodsproperty>> GetAllGoodsPropertyAsync(string store_id)
        {
            return await _onlinePosContext.TblGoodsproperties
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }
        
        public async Task<IEnumerable<TblGoodsunit>> GetAllGoodsUnitAsync(string store_id)
        {
            return await _onlinePosContext.TblGoodsunits
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }
        
        public async Task<IEnumerable<TblSellprice>> GetAllSellPriceAsync(string store_id)
        {
            return await _onlinePosContext.TblSellprices
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
        }
        
        

        #endregion

        #region CREATE

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
            tblPropertygroup.PropertyId = propertyCounter;
            tblPropertygroup.PropertyCounter = GetPropertyCounterByStoreId(tblPropertygroup.StoreId) + 1;
            _onlinePosContext.TblPropertygroups
                .Add(tblPropertygroup);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task SaveGoods(GoodsDTO goodsDTO, IFormFile imageFile)
        {
            var entity = _mapper.Map<TblGood>(goodsDTO);
            var goodsCounter = GenerateGoodId(entity.StoreId, entity.GroupId);
            entity.GoodsId = entity.GroupId + goodsCounter;
            entity.GoodsCounter = GetGoodsCounterByStoreId(entity.StoreId, entity.GroupId) + 1;
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
            var goodProperty_id = GetGoodPropertyCounterByStoreId(store_id);
            var counter = GenerateGoodProperty(store_id);
            var newProperty = new TblGoodsproperty
            {
                PropertyGoodsId = counter,
                StoreId = store_id,
                GoodsId = goods_id,
                PropertyId = property_id,
                PropertyName = property_value,
                PropertyCounter = goodProperty_id + 1
                
            };
            _onlinePosContext.TblGoodsproperties
                .Add(newProperty);
            await _onlinePosContext.SaveChangesAsync();
        
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
            var nCounter = counter + 1;
            string group_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return group_id;
        }

        public string GenerateGoodId(string store_id, string groupId)
        {
            int counter = GetGoodsCounterByStoreId(store_id, groupId);
            var nCounter = counter + 1;
            string good_id = new string('0', 4 - nCounter.ToString().Length) + nCounter.ToString();
            return good_id;
        }

        public string GenerateGoodGroupProperty(string store_id)
        {
            int counter = GetPropertyCounterByStoreId(store_id);
            var nCounter = counter + 1;
            string group_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return group_id;
        }
        
        public string GenerateGoodProperty(string store_id)
        {
            int counter = GetGoodPropertyCounterByStoreId(store_id);
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

        public int GetGoodsCounterByStoreId(string storeId, string groupId)
        {
            var goodsCounter = _onlinePosContext.TblGoods
                .Where(g => g.StoreId == storeId && g.GroupId == groupId)
                .OrderBy(g => g.StoreId)
                .ThenByDescending(g => g.GoodsCounter)
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

        public int GetGoodPropertyCounterByStoreId(string storeId)
        {
            var propertyCounter = _onlinePosContext.TblGoodsproperties
                .Where(g => g.StoreId == storeId)
                .OrderBy(g => g.StoreId)
                .ThenByDescending(g => g.PropertyCounter)
                .Select(g => g.PropertyCounter)
                .FirstOrDefault();
            return propertyCounter;
        }

        #endregion

        #region UPDATE

        public async Task UpdateGoods(string storeId, string goodsId, string goodsName, string goodsBrand,
            int goodsStatus, IFormFile imageFile)
        {
            var existingGoods = await _onlinePosContext.TblGoods
                .FirstOrDefaultAsync(g => g.GoodsId == goodsId && g.StoreId == storeId);

            if (existingGoods == null)
            {
                throw new KeyNotFoundException("Goods not found.");
            }

            if (!string.IsNullOrEmpty(goodsName))
                existingGoods.GoodsName = goodsName;

            if (!string.IsNullOrEmpty(goodsBrand))
                existingGoods.GoodsBrand = goodsBrand;

            existingGoods.GoodsStatus = goodsStatus;

            if (imageFile != null)
            {
                var imageName = $"{existingGoods.StoreId}-{existingGoods.GroupId}-{goodsId}";
                var uploadResult = await UploadImageToCloudinary(imageFile, storeId, goodsId, imageName);
                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                existingGoods.Picture = uploadResult.SecureUrl.ToString();
            }

            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task UpdateGroup(string storeId, string groupId, string groupName, int groupStatus)
        {
            var existingGroup = await _onlinePosContext.TblGoodsgroups
                .FirstOrDefaultAsync(g => g.StoreId == storeId && g.GroupId == groupId);

            if (existingGroup == null)
            {
                throw new KeyNotFoundException("Goods group not found.");
            }

            if (!string.IsNullOrEmpty(groupName))
                existingGroup.GroupName = groupName;

            existingGroup.GroupStatus = groupStatus;

            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task UpdateGoodsProperty(string goodsPropertyId, string updateProperty)
        {
            var existingProperty = await _onlinePosContext.TblGoodsproperties
                .FirstOrDefaultAsync(p => p.PropertyGoodsId == goodsPropertyId );

            if (existingProperty == null)
            {
                throw new KeyNotFoundException("Goods property not found.");
            }
            if(!string.IsNullOrEmpty(updateProperty))
                existingProperty.PropertyName = updateProperty;

            _onlinePosContext.TblGoodsproperties.Update(existingProperty);
            await _onlinePosContext.SaveChangesAsync();
        }


        public async Task UpdateGroupProperty(string storeId, string propertyId, string propertyName)
        {
            var existingGroup = await _onlinePosContext.TblPropertygroups
                .FirstOrDefaultAsync(g => g.StoreId == storeId && g.PropertyId == propertyId);

            if (existingGroup == null)
            {
                throw new KeyNotFoundException("Group property not found.");
            }

            if (!string.IsNullOrEmpty(propertyName))
                existingGroup.PropertyName = propertyName;

            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task UpdateGoodsUnit(string storeId, string goodsId, string goodsUnit, int size, int status,
            int stock)
        {
            var existingUnit = await _onlinePosContext.TblGoodsunits
                .FirstOrDefaultAsync(u => u.StoreId == storeId && u.GoodsUnit == goodsUnit);

            if (existingUnit == null)
            {
                throw new KeyNotFoundException("Goods unit not found.");
            }

            if (!string.IsNullOrEmpty(goodsUnit))
                existingUnit.GoodsUnit = goodsUnit;

            if (!string.IsNullOrEmpty(goodsId))
                existingUnit.GoodsId = goodsId;

            existingUnit.UnitSize = size;
            existingUnit.UnitStatus = status;
            existingUnit.UnitStock = stock;


            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task UpdateSellingPrices(string storeId, string goodsId, string barcode, string goodsUnit,
            int price, int sku)
        {
            var existingPrice = await _onlinePosContext.TblSellprices
                .FirstOrDefaultAsync(p => p.StoreId == storeId && p.GoodsId == goodsId && p.Barcode == barcode);

            if (existingPrice == null)
            {
                throw new KeyNotFoundException("Selling price not found.");
            }

            existingPrice.GoodsUnit = goodsUnit;
            existingPrice.SellPrice = price;
            existingPrice.SellNumber = sku;

            await _onlinePosContext.SaveChangesAsync();
        }

        #endregion

        #region DELETE

        public async Task DeleteGoods(string storeId, string goodsId)
        {
            var goods = await _onlinePosContext.TblGoods
                .FirstOrDefaultAsync(g => g.StoreId == storeId && g.GoodsId == goodsId);

            if (goods == null)
            {
                throw new KeyNotFoundException("Goods not found.");
            }

            bool validgoodsProperty = await _onlinePosContext.TblGoodsproperties
                .AnyAsync(g => g.StoreId == storeId && g.GoodsId == goodsId);

            bool validsellPrice = await _onlinePosContext.TblSellprices
                .AnyAsync(g => g.StoreId == storeId && g.GoodsId == goodsId);

            if (validgoodsProperty && validsellPrice)
            {
                throw new InvalidOperationException(
                    "Cannot delete goods because it has associated goodsProperty and SellPrice.");
            }

            _onlinePosContext.TblGoods.Remove(goods);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task DeleteGroup(string storeId, string groupId)
        {
            var group = await _onlinePosContext.TblGoodsgroups
                .FirstOrDefaultAsync(g => g.StoreId == storeId && g.GroupId == groupId);
            if (group == null)
            {
                throw new KeyNotFoundException("Group not found.");
            }

            bool validGoods = await _onlinePosContext.TblGoods
                .AnyAsync(g => g.StoreId == storeId && g.GroupId == groupId);
            if (validGoods)
            {
                throw new InvalidOperationException("Cannot delete group because it has associated goods.");
            }

            _onlinePosContext.TblGoodsgroups.Remove(group);
            await _onlinePosContext.SaveChangesAsync();
        }


        
        public async Task DeleteGoodsProperty(string storeId, string goodsPropertyId)
        {
            var property = await _onlinePosContext.TblGoodsproperties
                .Where(s => s.StoreId == storeId && 
                            s.PropertyGoodsId == goodsPropertyId)
                .FirstOrDefaultAsync();

            
            Console.WriteLine($"Deleting property: {property}");
            if (property != null)
            {
                _onlinePosContext.TblGoodsproperties.Remove(property);
                await _onlinePosContext.SaveChangesAsync();
            }
            
            
        }

        public async Task DeleteGroupProperty(string storeId, string propertyId)
        {
            var group = await _onlinePosContext.TblPropertygroups
                .FirstOrDefaultAsync(g => g.StoreId == storeId && g.PropertyId == propertyId);

            if (group == null)
            {
                throw new KeyNotFoundException("Group property not found.");
            }

            bool validGoodsProperty = await _onlinePosContext.TblGoodsproperties
                .AnyAsync(g => g.StoreId == storeId && g.PropertyId == propertyId);

            if (validGoodsProperty)
            {
                throw new InvalidOperationException("Cannot delete group property because it has associated goods.");
            }

            _onlinePosContext.TblPropertygroups.Remove(group);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task DeleteGoodsUnit(string storeId, string goodsUnit)
        {
            var unit = await _onlinePosContext.TblGoodsunits
                .FirstOrDefaultAsync(u => u.StoreId == storeId && u.GoodsUnit == goodsUnit);

            if (unit == null)
            {
                throw new KeyNotFoundException("Goods unit not found.");
            }

            bool validUnit = await _onlinePosContext.TblSellprices
                .AnyAsync(g => g.StoreId == storeId && g.GoodsUnit == goodsUnit);

            if (validUnit)
            {
                throw new InvalidOperationException("Cannot delete group property because it has associated goods.");
            }

            _onlinePosContext.TblGoodsunits.Remove(unit);
            await _onlinePosContext.SaveChangesAsync();
        }

        public async Task DeleteSellPrice(string storeId, string goodsId, string goodsUnit)
        {
            var sellPrice = await _onlinePosContext.TblSellprices
                .Where(s => s.StoreId == storeId && s.GoodsId == goodsId && s.GoodsUnit == goodsUnit)
                .FirstOrDefaultAsync();

            if (sellPrice == null)
            {
                throw new KeyNotFoundException("Sell price not found.");
            }

            _onlinePosContext.TblSellprices.Remove(sellPrice);
            await _onlinePosContext.SaveChangesAsync();
        }

        #endregion


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