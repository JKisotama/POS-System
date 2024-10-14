using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Receipt
{
    public interface IReceiptServices
    {
        Task<IEnumerable<TblReceipt>> GetReceiptList(string store_id);
        Task<TblReceipt> GetReceipt(string store_id, string recepit_number);
        Task<IEnumerable<TblReceiptdetail>> GetReceiptdetailsAsync(string store_id, string receipt_number);
        string GenerateSupplierId(string store_id, DateTime created_Date);
    }
}

