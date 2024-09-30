﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_BAL.Services.Goods;
using POS_System_DAL.Data;
using POS_System_DAL.Models;

namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodGroupController : ControllerBase
    {
        private readonly OnlinePosContext _context;
        private readonly IGoodsServices _goodsServices;

        public GoodGroupController(OnlinePosContext context, IGoodsServices goodsServices)
        {
            _context = context;
            _goodsServices = goodsServices;
        }

        [HttpGet("Get All Group")]
        public async Task<ActionResult<IEnumerable<TblGoodsgroup>>> GetTblGoodsgroups(string store_id)
        {
            var groupList = await _goodsServices.GetTblGoodsgroupsAsync(store_id);
            if (groupList == null && groupList.Any())
            {
                return BadRequest();
            }
            return Ok(groupList);
        }

        [HttpGet("Get Group")]
        public async Task<ActionResult<TblGoodsgroup>> GetTblGoodsgroup(string store_id, string group_id)
        {
            var tblGoodsgroup = await _goodsServices.GetGroupAsync(store_id,group_id);

            if (tblGoodsgroup == null)
            {
                return NotFound();
            }

            return Ok(tblGoodsgroup);
        }

        [HttpGet("Get Goods By Group")]
        public async Task<ActionResult<IEnumerable<TblGood>>> GetGoodByGroup(string store_id,string group_id)
        {
            var goods = await _goodsServices.GetGoodsByGroupAsync(store_id,group_id);
            return Ok(goods);
        }

        [HttpGet("Get All Property Group")]
        public async Task<ActionResult<TblPropertygroup>> GetAllPropertyGood(string store_id)
        {
            var properties = await _goodsServices.GetAllPropertyGroupAsync(store_id);
            if (properties == null)
            {
                return Ok(new { message = "No property group found" });
            }
            return Ok(properties);
        } 
        [HttpGet("Get Property Group")]
        public async Task<ActionResult<TblPropertygroup>> GetPropertyGood(string store_id,string property_id)
        {
            var properties = await _goodsServices.GetPropertyGroupAsync(store_id, property_id);
            if (properties == null)
            {
                return NotFound("No property group found");
            }
            return Ok(properties);
        } 
        
        [HttpGet("Get Goods")]
        public async Task<ActionResult<TblGood>> GetGoods(string store_id,string goods_id)
        {
            var goods = await _goodsServices.GetGoodsAsync(store_id, goods_id);
            if(goods == null)
            {
                return NotFound();
            }
            
            return Ok(goods);
        }
        
        [HttpGet("Get Image")]
        public async Task<ActionResult<TblGood>> GetImage(string store_id,string goods_id)
        {
            var image = await _goodsServices.GetImage(store_id, goods_id);

            return Ok(image);
        }

        [HttpGet("Get Good Unit")]
        public async Task<ActionResult<IEnumerable<TblGoodsunit>>> GetUnit(string store_id, string goods_id,int type)
        {
            var unit = await _goodsServices.GetGoodsUnitAsync(store_id, goods_id, type);
            if (store_id != null && goods_id != null && type != null)
            {
                return NotFound("Not Found Unit");
            }
            return Ok(unit);
        }

        [HttpGet("Get Good Property")]
        public async Task<ActionResult<IEnumerable<TblGoodsproperty>>> GetProperty(string goods_id, string property_id, string user_language)
        {
            var properties = await _context.TblGoodsproperties
                .Where(g => g.GoodsId == goods_id && g.PropertyId == property_id && g.LocalValue == user_language)
                .ToListAsync();
            return Ok(properties); // chưa có function
        }

        [HttpGet("Get Good Prices")]
        public async Task<ActionResult<TblSellprice>>GetGoodPrice(string goods_id, string unit, int quantity)
        {
            var prices = await _context.TblSellprices
                .Where(s => s.GoodsId == goods_id && s.GoodsUnit == unit && s.SellNumber == quantity)
                .FirstOrDefaultAsync();
            if(prices == null)
            {
                return NotFound();
            }
            return Ok(prices);
        }
        [HttpPut("Update Good By Group {id}")]
        public async Task<IActionResult> PutTblGoodsgroup(string id, TblGoodsgroup tblGoodsgroup)
        {
            if (id != tblGoodsgroup.GroupId)
            {
                return BadRequest();
            }

            _context.Entry(tblGoodsgroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblGoodsgroupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPost("Save Good Group")]
        public async Task<ActionResult<TblGoodsgroup>> PostTblGoodsgroup(GoodsGroupDTO goodsGroupDTO)
        {
            await _goodsServices.SaveGoodsGroup(goodsGroupDTO);
            //return CreatedAtAction("GetTblGoodsgroup", new { id = goodsGroupDTO.GroupName }, goodsGroupDTO);
            return Ok("Test");
        }

        // DELETE: api/GoodGroup/5
        [HttpPost("Save Property Group")]
        public async Task<ActionResult<TblPropertygroup>> PostTblPropertyGroup(TblPropertygroup group_name)
        {
            await _goodsServices.SavePropertyGroup(group_name);
            return Ok(group_name);
        }

        [HttpPost("Save Goods TEST")]
        public async Task<ActionResult<GoodsDTO>> PostGoods([FromQuery]GoodsDTO goodsDTO, IFormFile file)
        {
            await _goodsServices.SaveGoods(goodsDTO, file);
            return StatusCode(201, "Create OK");
        }
        [HttpPost("Save Unit")]
        public async Task<ActionResult<TblGoodsunit>> PostTblUnit([FromQuery] GoodUnitDTO goodsunit/*string store_id,string goods_id, int applied_type, string unit_name, int sku, int size*/)
        {
            await _goodsServices.SaveUnit(goodsunit);
            return CreatedAtAction(("GetUnit"), new { id = goodsunit.GoodsUnit }, goodsunit);
        }
        [HttpPost("Save Property")]
        public async Task<ActionResult<TblGoodsproperty>> PostTblGoodProperty(string store_id, string goods_id, string property_id, string property_value)
        {
            await _goodsServices.SaveProperty(store_id,goods_id, property_id, property_value);

            return CreatedAtAction(nameof(TblGoodsproperty), property_id);
        }
        [HttpPost("Save Selling Price")]
        public async Task<ActionResult<TblSellprice>> PostTblSellPrice(string goods_id, string unit, string barcode, int quantity, int selling_price)
        {
            var prices = new TblSellprice();
            prices.GoodsId = goods_id;
            prices.GoodsUnit = unit;
            prices.Barcode = barcode;
            prices.SellNumber = quantity;
            prices.SellPrice = selling_price;

            await _goodsServices.SaveSellingPrices(prices);
            

            return Ok(prices);
        }

        private bool TblGoodsgroupExists(string id)
        {
            return _context.TblGoodsgroups.Any(e => e.GroupId == id);
        }
    }
}
