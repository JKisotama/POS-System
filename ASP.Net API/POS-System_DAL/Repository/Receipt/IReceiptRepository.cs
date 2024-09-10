using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.Receipt
{
    public interface IReceiptRepository : IGenericRepository<TblReceipt>
    {
        Task<IEnumerable<TblReceiptdetail>> GetDetails(string store_id, string receiptNumber);
        int GetReceiptCounterByStoreId(string storeId, DateTime created_Date);
    }
}
