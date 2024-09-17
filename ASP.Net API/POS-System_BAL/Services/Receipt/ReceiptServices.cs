using POS_System_DAL.Models;
using POS_System_DAL.Repository.Receipt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Receipt
{
    public class ReceiptServices : IReceiptServices
    {
        private readonly IReceiptRepository _receiptRepository;
        public ReceiptServices(IReceiptRepository receiptRepository)
        {
            _receiptRepository = receiptRepository;
        }

        public async Task<IEnumerable<TblReceipt>> GetReceiptList(string store_id)
        {
            var list = await _receiptRepository.GettAllAsync(s => s.StoreId == store_id);
            return list;
        }
        public async Task<TblReceipt> GetReceipt(string store_id, string recepit_number)
        {
            var recepit = await _receiptRepository.GetAsync(s => s.StoreId == store_id && s.ReceiptNumber == recepit_number);
            return recepit;
        }

        public async Task<IEnumerable<TblReceiptdetail>> GetReceiptdetailsAsync(string store_id, string receipt_number)
        {
            var receiptDetails = await _receiptRepository.GetDetails(store_id, receipt_number);
            return receiptDetails;
        }

        public string GenerateSupplierId(string store_id,  DateTime created_Date)
        {
            int counter = _receiptRepository.GetReceiptCounterByStoreId( store_id, created_Date );
            string supplier_Id = new string( '0', 2 - counter.ToString().Length );
            return supplier_Id;
        }
    }
}
