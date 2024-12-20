using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using POS_System_BAL.DTOs;
using POS_System_BAL.Services.Menu;
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
        private readonly IMenuServices _menuServices;

        public UsersController(OnlinePosContext context, IUserServices userServices, IMenuServices menuServices)
        {
            _context = context;
            _userServices = userServices;
            _menuServices = menuServices;
        }

        #region GET

        [HttpGet("GetAllUser")]
        public async Task<ActionResult<IEnumerable<TblUser>>> GetTblUsers(string store_id)
        {
            var userList = await _userServices.GetAllUser(store_id);
            if(userList == null)
            {
                return NotFound("No User Found");
            }
            return Ok(userList);
        }

     
        [HttpGet("GetUserById")]
        public async Task<ActionResult<TblUser>> GetTblUser(string store_id, string login_name)
        {
            var tblUser = await _userServices.GetUser(store_id, login_name);

            if (tblUser == null)
            {
                return NotFound();
            }

            return tblUser;
        }
        
        [HttpGet("CheckUserAccess")]
        public async Task<IActionResult> CheckUserAccess(string store_id, string login_name, int menu_id, int assigned)
        {
            bool hasAccess = await _userServices.HasUserAccess(store_id, login_name, menu_id, assigned);
            return hasAccess ? Ok("User has access.") : Forbid("User does not have access.");
        }

        [HttpGet("{store_id}/{login_name}/menus")]
        public async Task<IActionResult> GetUserMenus(string store_id, string login_name)
        {
            var menus = await _userServices.GetUserMenus(store_id, login_name);
            return Ok(menus);
        }

        
        #endregion

        #region POST

        [HttpPost("CreateUser")]
        public async Task<ActionResult<TblUser>> PostTblUser([FromQuery]TblUser tblUser)
        {
            var newUser = await _userServices
                .CreateUser(tblUser);
            return CreatedAtAction("GetTblUser", new { id = tblUser.LoginName }, newUser);
        }
        

        [HttpPost("Login")]
        public async Task<ActionResult<TblUser>> Login (string store_id, string login_name, string password)
        {
            var loginUser = await _userServices.Login(store_id, login_name, password);
            if (loginUser == null)
            {
                return Unauthorized("Invalid login credentials."); 
            }
            return Ok(new { message = "Login successful.", user = loginUser });
        }
        
        [HttpPost("GrantRights")]
        public async Task<IActionResult> GrantRights(string store_id, string login_name, int menu_id, int assigned)
        {
            var result = await _userServices.GrantRights(store_id, login_name, menu_id, assigned);
            if (result == -1)
            {
                return NotFound("User or menu not found.");
            }
            return Ok("Rights granted successfully.");
        }

        #endregion
        
        #region PUT

        [HttpPut("UpdateUser")]
        public async Task<ActionResult> PutTblUser([FromQuery]UserDTO userDTO,string store_id, string login_name, IFormFile avatar = null)
        {

             await _userServices
                .UpdateUserDTO(userDTO,store_id, login_name, avatar);
            return NoContent();
        }

        [HttpPut("UpdateUserLevel")]
        public async Task<ActionResult> PutUserLevel(string store_id, string login_name, int? userLevel)
        {
            var updateUser = await _userServices.CreateUserLevelAsync(store_id, login_name, userLevel);
            if (updateUser == null)
            {
                return NotFound("No User Found");
            }
            return NoContent();
        }

        #endregion

        #region DELETE

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(string store_id, string login_name)
        {
            try
            {
                await _userServices.DeleteUser(store_id, login_name);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion


    }
}
