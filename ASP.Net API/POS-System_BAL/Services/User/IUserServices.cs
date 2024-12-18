using Microsoft.AspNetCore.Http;
using POS_System_BAL.DTOs;
using POS_System_DAL.Models;


namespace POS_System_BAL.Services.User
{
    public interface IUserServices
    {
        #region GET

        Task<IEnumerable<TblUser>> GetAllUser(string store_id);
        Task<TblUser> GetUser(string store_id, string login_name);

        #endregion

        #region POST
        Task<TblUser> CreateUser(TblUser user);
        Task<TblUser> CreateUserLevelAsync(string store_id, string login_name, int? user_level);
        Task<TblUser> Login(string store_id, string login_name, string password);

        #endregion

        #region PUT

        Task<TblUser> UpdateUser(TblUser user, string store_id, string login_name);
        Task<UserDTO> UpdateUserDTO(UserDTO userDTO, string store_id, string login_name, IFormFile imageFile);

        #endregion

        #region DELETE

        Task DeleteUser(string storeId, string loginName);

        #endregion
        

    }
}
