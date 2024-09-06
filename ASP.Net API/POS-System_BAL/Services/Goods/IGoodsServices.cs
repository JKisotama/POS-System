using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.Goods
{
    public interface IGoodsServices
    {
        Task<IEnumerable<TblGoodsgroup>> GetTblGoodsgroupsAsync(string store_id);
        Task GetGroupAsync(string store_id, string group_id);
        Task<IEnumerable<TblGood>> GetGoodsByGroupAsync(string store_id, string group_id);
        Task<IEnumerable<TblPropertygroup>> GetAllPropertyGroupAsync(string store_id);
        Task GetPropertyGroupAsync(string store_id, string property_id);
        Task GetGoodsAsync(string store_id, string goods_id);
        Task<IEnumerable<string?>> GetGoodsUnitAsync(string store_id, string goods_id, int type);
        Task SaveUnit(string store_id, string goods_id, int applied_type, string unit_name, int sku, int size);
        Task SaveProperty(string store_id, string goods_id, string property_id, string property_value);
        string GenerateGoodGroupID(string store_id);
        string GenerateGoodId(string store_id, string goodgroup_id);
        string GenerateGoodGroupProperty(string store_id);
    }
}
