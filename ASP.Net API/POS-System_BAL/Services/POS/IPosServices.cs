using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using POS_System_BAL.Helper;

namespace POS_System_BAL.Services.POS
{
    public interface IPosServices
    {
        Task<PageResult<TblGood>> GetGoodListAsync(
            string store_id, 
            PagingParameters paging);

        Task<TblPo> CreatePoHeaderAsync(string storeId, string cashierId, string posCreator);
        Task<TblPosdetail> GetPoItemsAsync(string storeId, string posNumber);
        Task<IEnumerable<TblPosdetail>> GetPoItemsListAsync(string storeId);
        
        Task SavePoItemAsync(
            string storeId, 
            string posNumber, 
            string goodsId, 
            string barcode,
            string goodsUnit, 
            double quantitystring, 
            string goodsPropertyName, 
            string groupPropertyName,
            string posCreator);
        Task UpdateStatus(
            string store_id, 
            string po_number, 
            int status);
        Task PayPO(
            string store_id, 
            string po_number, 
            double customer_pay,
            string payer,
            int payment_type, 
            double money_return);
        Task GetDataByShift(string store_id, string shift_number);

        public TblPo CreateTemporaryPoHeader(
            string storeId,
            string cashierId,
            string posCreator);

        Task<PageResult<TblPo>> GetPoHeadersWithPagingAsync(
            string storeId, PagingParameters paging);
    }
    
}
