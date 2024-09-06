using POS_System_DAL.Repository.Receipt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Receipt
{
    public class ReceiptServices
    {
        private readonly IReceiptRepository _receiptRepository;
        public ReceiptServices(IReceiptRepository receiptRepository)
        {
            _receiptRepository = receiptRepository;
        }

        public string GenerateSupplierId(string store_id,  DateTime created_Date)
        {
            int counter = _receiptRepository.GetReceiptCounterByStoreId( store_id, created_Date );
            string supplier_Id = new string( '0', 2 - counter.ToString().Length );
            return supplier_Id;
        }
    }
}
