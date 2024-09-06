using POS_System_DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Receipt
{
    public class ReceiptRepository
    {
        private OnlinePosContext _onlinePosContext;
        public ReceiptRepository(OnlinePosContext onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
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
