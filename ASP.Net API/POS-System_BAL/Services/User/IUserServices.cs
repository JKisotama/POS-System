using POS_System_BAL.DTOs;
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
        Task<UserDTO> UpdateUser(UserDTO userDTO,string store_id, string login_name);
        Task<TblUser> CreateUserLevelAsync(string store_id, string login_name, int? user_level);
        Task<TblUser> Login(string store_id, string login_name, string password);
    }
}
