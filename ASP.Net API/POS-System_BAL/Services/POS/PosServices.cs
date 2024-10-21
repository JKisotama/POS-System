using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.POS
{
    public class PosServices : IPosServices
    {
        private readonly OnlinePosContext _onlinePosContext;
        public PosServices(OnlinePosContext onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }

        public async Task<IEnumerable<TblGood>> GetGoodListAsync(string store_id)
        {
            var list = await _onlinePosContext.TblGoods
                .Where(s => s.StoreId == store_id)
                .Include(g => g.Group)
                .Include(s => s.TblSellprices)
                .ToListAsync();
            return list.Select(g => new TblGood
            {
                GroupId = g.GroupId,
                GoodsId = g.GoodsId,
                GoodsName = g.GoodsName,
                GoodsBrand = g.GoodsBrand,
                GoodsStatus = g.GoodsStatus,
                StoreId = g.StoreId,
                GoodsCounter = g.GoodsCounter,
                Picture = g.Picture,
                TblSellprices = g.TblSellprices.Select(sp => new TblSellprice
                {
                    SellPrice = sp.SellPrice
                }).ToList()
            });
        }

        public async Task GetPoAsync(string store_id, int status)
        {

        }

        public async Task GetPoDetailsAsync(string store_id, string po_number)
        {

        }

        public async Task SavePo(string store_id, TblPo tblPo)
        {
            await _onlinePosContext.TblPos.AddAsync(tblPo);
        }

        public async Task SavePoItem(string store_id, TblReceiptdetail tblReceiptdetail, TblPosdetail tblPosdetail)
        {

        }

        public async Task UpdateStatus(string store_id, string po_number, int status)
        {

        }

        public async Task PayPO(string store_id, string po_number, double customer_pay, int payment_type, double money_return)
        {

        }

        public async Task GetDataByShift(string store_id, string shift_number)
        {

        }
    }
}
