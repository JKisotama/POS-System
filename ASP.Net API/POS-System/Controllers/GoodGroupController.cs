﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Azure;
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
        #region GET
        [HttpGet("GetAllGroup")]
        public async Task<ActionResult<IEnumerable<TblGoodsgroup>>> GetTblGoodsgroups(string store_id)
        {
            var groupList = await _goodsServices.GetTblGoodsgroupsAsync(store_id);
            if (groupList == null)
            {
                return BadRequest();
            }
            return Ok(groupList);
        }

        [HttpGet("GetGroup")]
        public async Task<ActionResult<TblGoodsgroup>> GetTblGoodsgroup(string store_id, string group_id)
        {
            var tblGoodsgroup = await _goodsServices.GetGroupAsync(store_id,group_id);

            if (tblGoodsgroup == null)
            {
                return NotFound();
            }

            return Ok(tblGoodsgroup);
        }

        [HttpGet("GetGoodsByGroup")]
        public async Task<ActionResult<IEnumerable<TblGood>>> GetGoodByGroup(string store_id,string group_id)
        {
            var goods = await _goodsServices.GetGoodsByGroupAsync(store_id,group_id);
            return Ok(goods);
        }

        [HttpGet("GetAllPropertyGroup")]
        public async Task<ActionResult<TblPropertygroup>> GetAllPropertyGood(string store_id)
        {
            var properties = await _goodsServices.GetAllPropertyGroupAsync(store_id);
            if (properties == null)
            {
                return Ok(new { message = "No property group found" });
            }
            return Ok(properties);
        } 
        [HttpGet("GetPropertyGroup")]
        public async Task<ActionResult<TblPropertygroup>> GetPropertyGood(string store_id,string property_id)
        {
            var properties = await _goodsServices.GetPropertyGroupAsync(store_id, property_id);
            if (properties == null)
            {
                return NotFound("No property group found");
            }
            return Ok(properties);
        } 
        
        [HttpGet("GetGoods")]
        public async Task<ActionResult<TblGood>> GetGoods(string store_id,string goods_id)
        {
            var goods = await _goodsServices.GetGoodsAsync(store_id, goods_id);
            if(goods == null)
            {
                return NotFound();
            }
            
            return Ok(goods);
        }

        [HttpGet("GetGoodUnit")]
        public async Task<ActionResult<IEnumerable<TblGoodsunit>>> GetUnit(string store_id, string goods_id,int type)
        {
            var unit = await _goodsServices.GetGoodsUnitAsync(store_id, goods_id, type);
            if (store_id != null && goods_id != null && type != null)
            {
                return Ok(unit);
            }
            return NotFound("Not Found Unit");
           
        }

        [HttpGet("GetGoodProperty")]
        public async Task<ActionResult<IEnumerable<TblGoodsproperty>>> GetProperty(string store_id,string goods_id, string property_id, string user_language)
        {
            var property = await _goodsServices.GetGoodsPropertyAsync(store_id,goods_id, property_id, user_language);
            if (property != null )
            {
                return NotFound("No Property found");
            }
            return Ok(property);
        }

        [HttpGet("GetGoodPrices")]
        public async Task<ActionResult<TblSellprice>>GetGoodPrice(string store_id,string goods_id, string unit, int quantity)
        {
            var prices = await _goodsServices.GetSellpricesAsync(store_id,goods_id, unit, quantity); 
            if(prices == null)
            {
                return NotFound();
            }
            return Ok(prices);
        }

        #endregion

        #region PUT
        [HttpPut("Chưa đụng nha ")]
        public async Task<IActionResult> PutTblGoodsgroup(string id, TblGoodsgroup tblGoodsgroup)
        {
            

            return NoContent();
        }
        #endregion

        #region POST
        [HttpPost("SaveGoodGroup")]
        public async Task<ActionResult<TblGoodsgroup>> PostTblGoodsgroup(GoodsGroupDTO goodsGroupDTO)
        {
            await _goodsServices.SaveGoodsGroup(goodsGroupDTO);
            return StatusCode(201, goodsGroupDTO);
        }

        // DELETE: api/GoodGroup/5
        [HttpPost("SavePropertyGroup")]
        public async Task<ActionResult<TblPropertygroup>> PostTblPropertyGroup(TblPropertygroup group_name)
        {
            await _goodsServices.SavePropertyGroup(group_name);
            return Ok(group_name);
        }

        [HttpPost("SaveGoods")]
        public async Task<ActionResult<GoodsDTO>> PostGoods([FromQuery]GoodsDTO goodsDTO, IFormFile file)
        {
            await _goodsServices.SaveGoods(goodsDTO, file);
            return StatusCode(201, goodsDTO);
        }
        [HttpPost("SaveUnit")]
        public async Task<ActionResult> PostTblUnit([FromBody] GoodUnitDTO goodsunit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _goodsServices.SaveUnit(goodsunit);
            return StatusCode(201, goodsunit);
        }
        [HttpPost("SaveProperty")]
        public async Task<ActionResult<TblGoodsproperty>> PostTblGoodProperty(string store_id, string goods_id, string property_id, string property_value)
        {
            await _goodsServices.SaveProperty(store_id,goods_id, property_id, property_value);

            return CreatedAtAction(nameof(TblGoodsproperty), property_id);
        }
        [HttpPost("SaveSellingPrice")]
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
        #endregion

    }
}
