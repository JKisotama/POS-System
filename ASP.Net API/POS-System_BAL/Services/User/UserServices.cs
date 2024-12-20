﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.DTOs;
using POS_System_BAL.Exceptions;
using POS_System_DAL.Authentication;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;

namespace POS_System_BAL.Services.User
{
    public class UserServices : IUserServices
    {
        private readonly IMapper _mapper;
        private readonly IAuthenticate _authenticate;
        private readonly OnlinePosContext _onlinePosContext;
        private readonly Cloudinary _cloudinary;
        private readonly IStringLocalizer<UserServices> _localizer;
        public UserServices(IMapper mapper, IAuthenticate authenticate, OnlinePosContext onlinePosContext, Cloudinary cloudinary)
        {
            _mapper = mapper;
            _authenticate = authenticate;
            _onlinePosContext = onlinePosContext;
            _cloudinary = cloudinary;
        }

        #region GET

        public async Task<IEnumerable<TblUser>> GetAllUser(string store_id)
        {
            return await _onlinePosContext.TblUsers.Where(s => s.StoreId == store_id && s.UserLevel == 1).ToListAsync();
        }

        public async Task<TblUser> GetUser(string store_id, string login_name)
        {
            return await _onlinePosContext.TblUsers
                .FirstOrDefaultAsync(s => s.StoreId == store_id && s.LoginName == login_name);
        }
        
        public async Task<bool> HasUserAccess(string store_id, string login_name, int menu_id, int assigned)
        {
            return await _onlinePosContext.TblUserrights
                .AnyAsync(ur => ur.StoreId == store_id && ur.LoginName == login_name && ur.MenuId == menu_id && ur.Assigned == assigned);
        }
        


        
        public async Task<IEnumerable<TblMenu>> GetUserMenus(string store_id, string login_name)
        {
            var user = await _onlinePosContext.TblUsers.FirstOrDefaultAsync(u => u.StoreId == store_id && u.LoginName == login_name);
            if(user.UserType == 0 && user.UserLevel == 0)
            {
                var menu = await _onlinePosContext.TblMenus
                    .Where(m => m.storeId == store_id)
                    .ToListAsync();
                return menu;
            }
            
            var userRights = await _onlinePosContext.TblUserrights
                .Where(ur => ur.StoreId == store_id && ur.LoginName == login_name)
                .Select(ur => ur.MenuId)
                .ToListAsync();



            var menus = await _onlinePosContext.TblMenus
                .Where(m => userRights.Contains(m.MenuId))
                .OrderBy(m => m.MenuOrder)
                .ToListAsync();

            return menus;
        }
        
        #endregion

        #region POST

        public async Task<TblUser> CreateUser(TblUser user)
        {
            if(user == null)
            {
                throw new ArgumentException(nameof(user), "User can not be null");
            }
            if (string.IsNullOrWhiteSpace(user.LoginName))
            {
                throw new ArgumentException ("Login name is required.");
            }

            if (string.IsNullOrWhiteSpace(user.PassWord))
            {
                throw new ArgumentException ( "Password is required.");
            }

            try
            {
                var newUser = new TblUser
                {
                    StoreId = user.StoreId,
                    LoginName = user.LoginName,
                    FullName = user.FullName,
                    PassWord = _authenticate.VerifyPasswordHash(user.PassWord),
                    Address = user.Address,
                    Phone = user.Phone,
                    DoB = user.DoB,
                    Email = user.Email,
                    Gender = user.Gender,
                    IdentifyString = user.IdentifyString,
                    UserLanguage = user.UserLanguage,
                    UserType = user.UserType,
                    UserLevel = 1,
                    UserStatus = 1,
                    Picture = null
                };
                _onlinePosContext.TblUsers.Add(newUser);
                await _onlinePosContext.SaveChangesAsync();

                return newUser;

            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine(dbEx);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
            return user;
        }

        public async Task<TblUser> CreateUserLevelAsync(string store_id, string login_name, int? user_level)
        {
            var existUser = await GetUser(store_id, login_name);
            if (existUser == null)
            {
                throw new UserExecptions("No User found.");
            }
            try
            {
                existUser.UserLevel = user_level;
                _onlinePosContext.TblUsers.Update(existUser);
                await _onlinePosContext.SaveChangesAsync();

                return existUser;
            }
            catch(UserExecptions ex)
            {
                Console.WriteLine(ex);
                return null;
            }
            
        }

        public async Task<TblUser> Login(string store_id, string login_name, string password)
        {
            var user = await _authenticate.CheckLogin(store_id, login_name, password);
            return user;
        }
        
        public async Task<int> GrantRights(string store_id, string login_name, int menu_id, int assigned)
        {
            var user = await GetUser(store_id, login_name);
            var menu = await _onlinePosContext.TblMenus.FirstOrDefaultAsync(m => m.MenuId == menu_id);
            var counter = GenerateRightId(store_id);
            var rightid = GetRightCounterByStoreId(store_id);

            if (user == null || menu == null)
            {
                return -1;
            }

            var existingRight = await _onlinePosContext.TblUserrights
                .FirstOrDefaultAsync(ur => ur.LoginName == login_name && ur.MenuId == menu_id && ur.StoreId == store_id);

            if (existingRight != null)
            {
                existingRight.Assigned = assigned;
            }
            else
            {
                var userRight = new TblUserright
                {
                    RightId = counter,
                    LoginName = login_name,
                    MenuId = menu_id,
                    StoreId = store_id,
                    Assigned = assigned,
                    counter = rightid + 1
                };

                await _onlinePosContext.TblUserrights.AddAsync(userRight);
            }

            await _onlinePosContext.SaveChangesAsync();
            return 0;
        }

        #endregion

        #region PUT

        public async Task<TblUser> UpdateUser(string storeId, string loginName,
            string fullName, string userLanguage, int userType, int userLevel, int userStatus)
        {
            var existUser = await GetUser(storeId,loginName);
            if (existUser != null)
            {
                existUser.FullName = fullName;
                existUser.UserLanguage = userLanguage;
                existUser.UserType = userType;
                existUser.UserLevel = userLevel;
                existUser.UserStatus = userStatus;
                _onlinePosContext.TblUsers.Update(existUser);
                await _onlinePosContext.SaveChangesAsync();
            }
            return existUser;
        }
        public async Task<UserDTO> UpdateUserDTO(UserDTO userDTO, string store_id, string login_name, IFormFile imageFile)
        {
            var existUser = await _onlinePosContext.TblUsers
                .FirstOrDefaultAsync(u => u.StoreId == store_id && u.LoginName == login_name);
            if (existUser  == null)
            {
                throw new KeyNotFoundException("User  not found.");
            }
            var entity = _mapper.Map<UserDTO>(existUser);
            
                existUser.FullName = userDTO.FullName;
                existUser.IdentifyString = userDTO.IdentifyString;
                existUser.Address = userDTO.Address;
                existUser.Phone = userDTO.Phone;
                existUser.Email = userDTO.Email;
                existUser.Gender = userDTO.Gender;
                existUser.DoB = userDTO.DoB;
                if (imageFile != null)
                {
                    var imageName = $"{userDTO.FullName}-avatar";
                    var uploadResult = await UploadImageToCloudinary(imageFile, userDTO.FullName, imageName);
                    if (uploadResult.Error != null)
                    {
                        throw new Exception(uploadResult.Error.Message);
                    }

                    existUser.Picture = uploadResult.SecureUrl.ToString();
                }
                _onlinePosContext.TblUsers.Update(existUser);
                await _onlinePosContext.SaveChangesAsync();
            
            return entity;
        }
        #endregion

        #region DELETE

        public async Task DeleteUser(string storeId, string loginName)
        {
            var user = await _onlinePosContext.TblUsers
                .Where(u => u.StoreId == storeId && u.LoginName == loginName)
                .FirstOrDefaultAsync();
            if (user == null)
            {
                throw new KeyNotFoundException("Sell price not found.");
            }

            _onlinePosContext.TblUsers.Remove(user);
            await _onlinePosContext.SaveChangesAsync();
        }

        #endregion
        
        
        
        
        private async Task<ImageUploadResult> UploadImageToCloudinary(
            IFormFile imageFile,
            string userId,
            string imageName)
        {
            var uploadResult = new ImageUploadResult();

            if (imageFile.Length > 0)
            {
                using (var stream = imageFile.OpenReadStream())
                {
                    var filePath = $"{userId}/{imageName}";
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(imageFile.FileName, stream),
                        PublicId = filePath,
                        Transformation = new Transformation().Crop("fill").Gravity("face").Width(300).Height(300)
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            return uploadResult;
        }
        
        public string GenerateRightId(string store_id)
        {
            int counter = GetRightCounterByStoreId(store_id);
            var nCounter = counter + 1;
            string group_id = new string('0', 3 - nCounter.ToString().Length) + nCounter.ToString();
            return group_id;
        }
        
        public int GetRightCounterByStoreId(string storeId)
        {
            var propertyCounter = _onlinePosContext.TblUserrights
                .Where(g => g.StoreId == storeId)
                .OrderBy(g => g.StoreId)
                .ThenByDescending(g => g.counter)
                .Select(g => g.counter)
                .FirstOrDefault();
            return propertyCounter;
        }

    }
}
