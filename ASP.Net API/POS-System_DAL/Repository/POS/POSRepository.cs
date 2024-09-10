using POS_System_DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.POS
{
    public class POSRepository : IPOSRepository
    {
        private OnlinePosContext _onlinePosContext;

        public POSRepository(OnlinePosContext onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }

        public int GetPOSCounterByStoreId(string storeId, DateTime created_Date, string cashier_id)
        {
            using (_onlinePosContext = new OnlinePosContext())
            {
                var posCounter = _onlinePosContext.TblPos
                    .Where(g => g.StoreId == storeId && g.PosDate == created_Date && g.CashierId == cashier_id)
                    .Select(g => g.PosCounter)
                    .FirstOrDefault();
                return (int)posCounter;
            }
        }
    }
}
