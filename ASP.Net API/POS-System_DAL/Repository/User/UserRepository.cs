using Microsoft.EntityFrameworkCore;
using POS_System_DAL.Data;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_DAL.Repository.User
{
    public class UserRepository: GenericRepository<TblUser> ,IUserRepository
    {
        private readonly OnlinePosContext _onlinePosContext;

        public UserRepository(OnlinePosContext onlinePosContext) : base(onlinePosContext)
        {
            _onlinePosContext = onlinePosContext;
        }

        public async Task<TblUser> GetUser(string store_id, string login_name)
        {
            return await GetAsync(s => s.StoreId == store_id && s.LoginName == login_name);
        }

        public Task<bool> TblUserExists(string login_Name)
        {
            return _onlinePosContext.TblUsers.AnyAsync(e => e.LoginName == login_Name);
        }
    }
}
