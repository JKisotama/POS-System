using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_DAL.Authentication;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Services.User
{
    public class UserServices : IUserServices
    {
        private readonly IMapper _mapper;
        private readonly IAuthenticate _authenticate;
        private readonly OnlinePosContext _onlinePosContext;
        public UserServices(IMapper mapper, IAuthenticate authenticate, OnlinePosContext onlinePosContext)
        {
            _mapper = mapper;
            _authenticate = authenticate;
            _onlinePosContext = onlinePosContext;
        }

        public async Task<IEnumerable<TblUser>> GetAllUser(string store_id)
        {
            return await _onlinePosContext.TblUsers.Where(s => s.StoreId == store_id).ToListAsync();
        }

        public async Task<TblUser> GetUser(string store_id, string login_name)
        {
            return await _onlinePosContext.TblUsers.FirstOrDefaultAsync(s => s.StoreId == store_id && s.LoginName == login_name);
        }

        public async Task<TblUser> CreateUser(TblUser user)
        {
            try
            {
                var newUser = new TblUser
                {
                    StoreId = user.StoreId,
                    LoginName = user.LoginName,
                    FullName = user.FullName,
                    PassWord = _authenticate.VerifyPasswordHash(user.PassWord),
                    IdentifyString = user.IdentifyString,
                    UserLanguage = user.UserLanguage,
                    UserType = user.UserType,
                    UserLevel = 1,
                    UserStatus = 0
                };
                _onlinePosContext.TblUsers.Add(newUser);
                await _onlinePosContext.SaveChangesAsync();
                
               

                return newUser;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
                
            }
        }

        public async Task<UserDTO> UpdateUser(UserDTO userDTO, string store_id, string login_name)
        {
            var existUser = await GetUser(store_id,login_name);
            var entity = _mapper.Map<UserDTO>(existUser);
            if (existUser != null)
            {
                existUser.FullName = userDTO.FullName;
                existUser.PassWord = _authenticate.VerifyPasswordHash(userDTO.PassWord);
                existUser.IdentifyString = userDTO.IdentifyString;
                existUser.UserLanguage = userDTO.UserLanguage;
                existUser.UserType = userDTO.UserType;
                existUser.UserLevel = userDTO.UserLevel;
                existUser.UserStatus = userDTO.UserStatus;
                
                _onlinePosContext.TblUsers.Update(existUser);
                await _onlinePosContext.SaveChangesAsync();
            }
            return entity;
        }

        public async Task<TblUser> Login(string store_id, string login_name, string password)
        {
            var user = await _authenticate.CheckLogin(store_id, login_name, password);
            return user;
        }

        public async Task<int> GrandRights(string store_id, string login_name, int menu_id)
        {
            var user = GetUser(store_id, login_name);
            var menu = _onlinePosContext.TblMenus.FirstOrDefaultAsync(m => m.MenuId == menu_id);
            if(user == null || menu == null)
            {
                return -1;
            }
            var userRights = new TblUserright
            {
                LoginName = login_name,
                MenuId = menu_id,
                StoreId = store_id,
                Assigned = 0
            };

            _onlinePosContext.TblUserrights
                .Add(userRights);
            await _onlinePosContext.SaveChangesAsync();
            return 0;
        }
    }
}
