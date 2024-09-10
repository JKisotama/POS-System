using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Receipt
{
    public class ReceiptRepository : GenericRepository<TblReceipt>, IReceiptRepository
    {
        private OnlinePosContext _onlinePosContext;
        public ReceiptRepository(OnlinePosContext onlinePosContext) : base(onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }

        public async Task<IEnumerable<TblReceiptdetail>> GetDetails(string store_id, string receiptNumber)
        {
            return await _onlinePosContext.TblReceiptdetails
                .Where(s => s.StoreId == store_id && s.ReceiptNumber == receiptNumber)
                .ToListAsync();
        }
        public int GetReceiptCounterByStoreId(string storeId, DateTime created_Date)
        {
            using (_onlinePosContext = new OnlinePosContext())
            {
                var receiptCounter = _onlinePosContext.TblReceipts
                    .Where(g => g.StoreId == storeId && g.ReceiptDate == created_Date.Date)
                    .Select(g => g.ReceiptCounter)
                    .FirstOrDefault();
                return (int)receiptCounter;
            }
        }
    }
}
