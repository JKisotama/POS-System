using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Receipt
{
    public class ReceiptServices : IReceiptServices
    {
        private readonly OnlinePosContext _onlinePosContext;
        public ReceiptServices(OnlinePosContext onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }

        public async Task<IEnumerable<TblReceipt>> GetReceiptList(string store_id)
        {
            var list = await _onlinePosContext.TblReceipts
                .Where(s => s.StoreId == store_id)
                .ToListAsync();
            return list;
        }
        public async Task<TblReceipt> GetReceipt(string store_id, string recepit_number)
        {
            var recepit = await _onlinePosContext.TblReceipts
                .Where(s => s.StoreId == store_id && s.ReceiptNumber == recepit_number)
                .FirstOrDefaultAsync();
            return recepit;
        }

        public async Task<IEnumerable<TblReceiptdetail>> GetReceiptdetailsAsync(string store_id, string receipt_number)
        {
            var receiptDetails =  await _onlinePosContext.TblReceiptdetails
                .Where(s => s.StoreId == store_id && s.ReceiptNumber == receipt_number)
                .ToListAsync();
            return receiptDetails;
        }

        public string GenerateSupplierId(string store_id,  DateTime created_Date)
        {
            int counter = GetReceiptCounterByStoreId( store_id, created_Date );
            var nCounter = counter + 1;
            string supplier_Id = new string( '0', 2 - counter.ToString().Length) + nCounter.ToString();
            return supplier_Id;
        }

        public int GetReceiptCounterByStoreId(string storeId, DateTime created_Date)
        {
                var receiptCounter = _onlinePosContext.TblReceipts
                    .Where(g => g.StoreId == storeId && g.ReceiptDate == created_Date.Date)
                    .OrderBy(g => g.StoreId)
                    .ThenByDescending(g => g.ReceiptCounter)
                    .Select(g => g.ReceiptCounter)
                    .FirstOrDefault();
                return receiptCounter;
            }
        }
    }

