using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.User
{
    public interface IUserRepository : IGenericRepository<TblUser>
    {

        Task<TblUser> GetUser(string store_id, string login_name);
        Task<bool> TblUserExists(string login_Name);
        //Task<TblUser> GrandRight();
    }
}
