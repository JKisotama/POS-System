using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Authentication
{
    public interface IAuthenticate
    {
        int CheckLogin(string store_id, string login_name, string pass_word);
        int ForgotPassword(string store_id, string id_code, string login_name);
        void ChangePassword(string store_id, string login_name, string new_pass, string retype_pass);
        string VerifyPasswordHash(string password);
    }
}
