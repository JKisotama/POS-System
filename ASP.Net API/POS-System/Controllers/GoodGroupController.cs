
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET: api/GoodGroup
        [HttpGet("Get All Group")]
        public async Task<ActionResult<IEnumerable<TblGoodsgroup>>> GetTblGoodsgroups(string store_id)
        {
            await _goodsServices.GetTblGoodsgroupsAsync(store_id);
            return Ok();
        }

        // GET: api/GoodGroup/5
        [HttpGet("Get Group{id}")]
        public async Task<ActionResult<TblGoodsgroup>> GetTblGoodsgroup(string store_id, string group_id)
        {
            var tblGoodsgroup = _goodsServices.GetGroupAsync(store_id,group_id);

            if (tblGoodsgroup == null)
            {
                return NotFound();
            }

            return Ok(tblGoodsgroup);
        }

        [HttpGet("Get Goods By Group")]
        public async Task<ActionResult<IEnumerable<TblGood>>> GetGoodByGroup(string store_id,string group_id)
        {
            var goods = _goodsServices.GetGoodsByGroupAsync(store_id,group_id);
            return Ok(goods);
        }

        [HttpGet("Get Property Group")]
        public async Task<ActionResult<IEnumerable<TblPropertygroup>>> GetPropertyGood(string store_id)
        {
            var properties = _goodsServices.GetAllPropertyGroupAsync(store_id);
            return Ok(properties);
        }

        //[HttpGet("Get Good By Name")]
        //public async Task<ActionResult<TblGood>> GetGoodByName(string goods_reminiscent_name)
        //{

        //}



        [HttpGet("Get Good Unit")]
        public async Task<ActionResult<IEnumerable<TblGoodsunit>>> GetUnit(string store_id, int type)
        {
            var unit = await _context.TblGoodsunits.FindAsync(store_id, type);
            if (store_id == unit.StoreId && type == unit.UnitStatus)
            {
                return Ok(unit);
            }
            return NotFound();
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

        // PUT: api/GoodGroup/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/GoodGroup
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Save Good Group")]
        public async Task<ActionResult<TblGoodsgroup>> PostTblGoodsgroup(TblGoodsgroup tblGoodsgroup)
        {
            _context.TblGoodsgroups.Add(tblGoodsgroup);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TblGoodsgroupExists(tblGoodsgroup.GroupId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTblGoodsgroup", new { id = tblGoodsgroup.GroupId }, tblGoodsgroup);
        }

        // DELETE: api/GoodGroup/5
        [HttpPost("Save Property Group")]
        public async Task<ActionResult<TblPropertygroup>> PostTblPropertyGroup(TblPropertygroup group_name)
        {
            _context.TblPropertygroups.Add(group_name);
            await _context.SaveChangesAsync();
            return Ok(group_name);
        }
        [HttpPost("Save Unit")]
        public async Task<ActionResult<TblGoodsunit>> PostTblUnit(string store_id,string goods_id, int applied_type, string unit_name, int sku, int size)
        {
            var unit =  _goodsServices.SaveUnit(store_id,goods_id, applied_type, unit_name, sku, size);
            return CreatedAtAction(nameof(GetUnit), new { unit_name = unit.Id }, unit);
        }
        [HttpPost("Save Property")]
        public async Task<ActionResult<TblGoodsproperty>> PostTblGoodProperty(string store_id, string goods_id, string property_id, string property_value)
        {
            var property = _goodsServices.SaveProperty(store_id,goods_id, property_id, property_value);

            return CreatedAtAction(nameof(TblGoodsproperty), property);
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
            
            _context.TblSellprices.Add(prices);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(TblSellprice), new {id = prices.GoodsId}, prices);
        }

        private bool TblGoodsgroupExists(string id)
        {
            return _context.TblGoodsgroups.Any(e => e.GroupId == id);
        }
    }
}
