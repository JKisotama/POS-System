
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
using Microsoft.IdentityModel.Tokens;
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
        public async Task<ActionResult<IEnumerable<TblGood>>> GetGoodByGroup(
            [FromQuery]string store_id, 
            [FromQuery] string group_id = null, 
            [FromQuery] string filter = null)
        {
            var query = _goodsServices.GetGoodsQueryable();
            var goods = await _goodsServices.GetGoodsByGroupAsync(query,store_id,group_id,filter);
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
        public async Task<ActionResult<IEnumerable<TblGoodsunit>>> GetUnit(
            string store_id, 
            string goods_id,
            int status)
        {
            var unit = await _goodsServices.GetGoodsUnitAsync(store_id, goods_id, status);
            if (store_id != null && goods_id != null && status != null)
            {
                return Ok(unit);
            }
            return NotFound("Not Found Unit");
           
        }

        [HttpGet("GetGoodProperty")]
        public async Task<ActionResult<IEnumerable<TblGoodsproperty>>> GetProperty(
            string store_id,
            string property_id)
        {
            var property = await _goodsServices.GetGoodsPropertyAsync(store_id,property_id);
            if (property == null )
            {
                return NotFound("No Property found");
            }
            return Ok(property);
        }
        [HttpGet("GetGoodPropertyById")]
        public async Task<ActionResult<IEnumerable<TblGoodsproperty>>> GetPropertyById(
            string store_id,
            string goods_id)
        {
            var property = await _goodsServices.GetGoodsPropertyByIdAsync(store_id,goods_id);
            if (property == null )
            {
                return NotFound("No Property found");
            }
            return Ok(property);
        }

        [HttpGet("GetGoodPrices")]
        public async Task<ActionResult<IEnumerable<GoodsWithSellPriceDTO>>>GetGoodPrice(
            [FromQuery] string store_id ,
            [FromQuery] string filter = null,
            [FromQuery] int? quantity = null,
            [FromQuery] int? prices = null)
        {
            var goodsQuery = _goodsServices.GetGoodsQueryable();
            var priceQuery = _goodsServices.GetSelPriceQueryable();
            var goods = await _goodsServices.GetGoodsWithSellPricesAsync(goodsQuery, priceQuery, store_id, filter, quantity, prices);
            return Ok(goods);
        }

        [HttpGet("GetSellPrice")]
        public async Task<IActionResult> GetSellPrice(string store_id, string goods_id)
        {
            
            var sellPrice = await _goodsServices.GetSellpricesAsync(store_id, goods_id);
            return Ok(sellPrice);
        }

        #endregion

        #region PUT
        [HttpPut("UpdateGoods")]
        public async Task<IActionResult> UpdateGoods(string store_id, string goods_id, string good_name, string goods_brand, int goods_status, IFormFile imageFile = null)
        {
            try
            {
                await _goodsServices.UpdateGoods(store_id, goods_id, good_name, goods_brand, goods_status,imageFile);
                return NoContent(); 
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Goods not found.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("UpdateGroup")]
        public async Task<IActionResult> UpdateGroup(string store_id, string group_id, string group_name, int group_status)
        {
            try
            {
                await _goodsServices.UpdateGroup(store_id, group_id, group_name, group_status);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("UpdateGoodsProperty")]
        public async Task<IActionResult> UpdateGoodsProperty(string goodsPropertyId,string update_property)
        {
            try
            {
                await _goodsServices.UpdateGoodsProperty(goodsPropertyId, update_property);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("UpdateGroupProperty")]
        public async Task<IActionResult> UpdateGroupProperty(string store_id, string property_id, string property_name)
        {
            try
            {
                await _goodsServices.UpdateGroupProperty(store_id, property_id, property_name);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("UpdateUnit")]
        public async Task<IActionResult> UpdateUnit(string store_id, string goods_id, string unit, int size, int status, int stock)
        {
            try
            {
                await _goodsServices.UpdateGoodsUnit(store_id, goods_id, unit, size, status, stock);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        
        [HttpPut("UpdateSellingPrice")]
        public async Task<IActionResult> UpdateSellingPrice(string store_id, string goods_id, string unit, string barcode, int quantity, int selling_price)
        {
            try
            {
                await _goodsServices.UpdateSellingPrices(store_id, goods_id,barcode, unit , selling_price,quantity);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        #endregion

        #region POST
        [HttpPost("SaveGoodGroup")]
        public async Task<ActionResult<TblGoodsgroup>> PostTblGoodsgroup(GoodsGroupDTO goodsGroupDTO)
        {
            await _goodsServices.SaveGoodsGroup(goodsGroupDTO);
            return StatusCode(201, goodsGroupDTO);
        }

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
        public async Task<IActionResult> PostTblGoodProperty(string store_id, string goods_id, string property_id, string property_value)
        {
            await _goodsServices.SaveProperty(store_id,goods_id, property_id, property_value);

            return StatusCode(201, property_id);
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

        #region DELETE

        [HttpDelete("DeleteGoods")]
        public async Task<IActionResult> DeleteGoods(string store_id, string goods_id)
        {
            try
            {
                await _goodsServices.DeleteGoods(store_id, goods_id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete("DeleteGroup")]
        public async Task<IActionResult> DeleteGroup(string store_id, string group_id)
        {
            try
            {
                await _goodsServices.DeleteGroup(store_id, group_id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete("DeleteGoodsProperty")]
        public async Task<IActionResult> DeleteGoodsProperty(string store_id,  string goodsProperty_id)
        {
            
            try
            {
                await _goodsServices.DeleteGoodsProperty(store_id, goodsProperty_id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete("DeleteGroupProperty")]
        public async Task<IActionResult> DeleteGroupProperty(string store_id, string group_id)
        {
            try
            {
                await _goodsServices.DeleteGroupProperty(store_id, group_id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete("DeleteGoodsUnit")]
        public async Task<IActionResult> DeleteGoodsUnit(string store_id, string goods_unit)
        {
            try
            {
                await _goodsServices.DeleteGoodsUnit(store_id, goods_unit);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete("DeleteSellingPrice")]
        public async Task<IActionResult> DeleteSellingPrice(string store_id, string goods_id, string unit)
        {
            try
            {
                await _goodsServices.DeleteSellPrice(store_id, goods_id, unit);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

    }
}
