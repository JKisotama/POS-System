using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POS_System_BAL.Services.User;
using POS_System_DAL.Data;
using POS_System_DAL.Models;


namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly OnlinePosContext _context;
        private readonly IUserServices _userServices;

        public UsersController(OnlinePosContext context, IUserServices userServices)
        {
            _context = context;
            _userServices = userServices;
        }

        // GET: api/Users
        [HttpGet("Get All User")]
        public async Task<ActionResult<IEnumerable<TblUser>>> GetTblUsers(string store_id)
        {
            var userList = await _userServices.GetAllUser(store_id);
            if(userList == null)
            {
                return NotFound("No User Found");
            }
            return Ok(userList);
        }

        // GET: api/Users/5
        [HttpGet("Get Userr by Id")]
        public async Task<ActionResult<TblUser>> GetTblUser(string store_id, string login_name)
        {
            var tblUser = await _userServices.GetUser(store_id, login_name);

            if (tblUser == null)
            {
                return NotFound();
            }

            return tblUser;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Update User")]
        public async Task<IActionResult> PutTblUser(string store_id, string login_name, string full_name,string identifyString,string password, int status)
        {

            var user = await _userServices
                .UpdateUser(store_id, login_name, full_name,identifyString,password,status);
            return Ok(user);
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Create User")]
        public async Task<ActionResult<TblUser>> PostTblUser([FromQuery]TblUser tblUser)
        {
            var newUser = await _userServices
                .CreateUser(tblUser);
            return CreatedAtAction("GetTblUser", new { id = tblUser.LoginName }, newUser);
        }

        //// DELETE: api/Users/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTblUser(string id)
        //{
        //    var tblUser = await _context.TblUsers.FindAsync(id);
        //    if (tblUser == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.TblUsers.Remove(tblUser);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        [HttpGet("Login")]
        public async Task<IActionResult> Login (string store_id, string login_name, string password)
        {
            await _userServices.Login(store_id,login_name,password);
            return Ok();
        }

    

        private void SetLanguage(string user_language)
        { 
            var culture = new CultureInfo(user_language);
            CultureInfo.CurrentCulture = culture;
            CultureInfo.CurrentUICulture = culture;
        }
    }
}
