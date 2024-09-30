using POS_System_DAL.Authentication;
using POS_System_DAL.Models;
using POS_System_DAL.Repository.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.User
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthenticate _authenticate;
        public UserServices(IUserRepository userRepository, IAuthenticate authenticate)
        {
            _userRepository = userRepository;           
            _authenticate = authenticate;
        }

        public async Task<IEnumerable<TblUser>> GetAllUser(string store_id)
        {
            if (true)
            {
               await _userRepository.GettAllAsync(s => s.StoreId == store_id);
            }
            return null;
        }

        public async Task<TblUser> GetUser(string store_id, string login_name)
        {
            return await _userRepository.GetAsync(s => s.StoreId == store_id && s.LoginName == login_name );
        }

        public async Task<TblUser> CreateUser(TblUser user)
        {
            if (! await _userRepository.TblUserExists(user.LoginName))
            {
                throw new InvalidOperationException("User Already Exist");
            }

            await _userRepository.AddAsync(user);
            return user;
        }

        public async Task<TblUser> UpdateUser(string storeId, string loginName, string fullName, string identifyString, string password, int status)
        {
            var user = await _userRepository.GetUser(storeId, loginName);
            if (user != null)
            {
                user.LoginName = loginName;
                user.FullName = fullName;
                user.IdentifyString = identifyString;
                user.PassWord = password;
                user.UserStatus = status;
                await _userRepository.UpdateAsync(user);
                return user;
                
            }
            throw new InvalidOperationException("Null");

        }

        public async Task Login(string store_id, string login_name, string password)
        {
            _authenticate.CheckLogin(store_id, login_name, password);
        }
    }
}
