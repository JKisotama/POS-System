using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.POS
{
    public interface IPosServices
    {
        Task<IEnumerable<TblGood>> GetGoodListAsync(string store_id);
        Task SavePo(string store_id, TblPo tblPo);
        Task SavePoItem(string store_id, TblReceiptdetail tblReceiptdetail, TblPosdetail tblPosdetail);
        Task UpdateStatus(string store_id, string po_number, int status);
        Task PayPO(string store_id, string po_number, double customer_pay, int payment_type, double money_return);
        Task GetDataByShift(string store_id, string shift_number);

    }
}
