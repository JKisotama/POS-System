using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.User
{
    public interface IUserServices
    {
        Task<IEnumerable<TblUser>> GetAllUser(string store_id);
        Task<TblUser> GetUser(string store_id, string login_name);
        Task<TblUser> CreateUser(TblUser user);
        Task<TblUser> UpdateUser(string storeId, string loginName, string fullName, string identifyString, string password, int status);
        Task Login(string store_id, string login_name, string password);
    }
}
