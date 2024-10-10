using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Authentication
{
    public class Authenticate : IAuthenticate
    {
        private readonly OnlinePosContext _onlinePosContext;
        public Authenticate(OnlinePosContext onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }
        public async Task<TblUser> CheckLogin(string store_id, string login_name, string pass_word)
        {
            string pass_encrypted = VerifyPasswordHash(pass_word);
            var user = (from u in _onlinePosContext.TblUsers
                        where u.StoreId == store_id &&
                              u.LoginName == login_name &&
                              u.PassWord == pass_encrypted
                        select u)
                        .FirstOrDefault();
            if (user != null)
            {
                if (user.UserStatus == 1)
                {
                    return null;
                }
                else
                    return user;
            }
            else
                return null;
        }

        public int ForgotPassword(string store_id, string id_code, string login_name)
        {
            var user = (from u in _onlinePosContext.TblUsers
                        where u.StoreId == store_id &&
                              u.LoginName == login_name &&
                              u.IdentifyString == id_code
                        select u)
                       .FirstOrDefault();
            if (user != null)
            {
                return 0;
            }
            else
                return 1;

        }

        public void ChangePassword(string store_id, string login_name, string new_pass, string retype_pass)
        {
            if (new_pass == retype_pass)
            {
                var user = _onlinePosContext.TblUsers.FirstOrDefault(u => u.LoginName == login_name && 
                u.StoreId == store_id);
                if (user != null)
                {
                    user.PassWord = VerifyPasswordHash(new_pass);
                    _onlinePosContext.SaveChangesAsync();
                }
            }
        }


        public string VerifyPasswordHash(string password)
        {
            using (var md5 = MD5.Create())
            {
                var hashBytes = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
                var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                return hashString;
            }
        }
    }
}
