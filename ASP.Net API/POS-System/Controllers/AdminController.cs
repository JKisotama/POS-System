using Microsoft.AspNetCore.Mvc;
using POS_System_BAL.DTOs;
using POS_System_BAL.Services.Customer;
using POS_System_BAL.Services.Goods;
using POS_System_BAL.Services.Receipt;
using POS_System_BAL.Services.Supplier;
using POS_System_BAL.Services.User;
using POS_System_DAL.Models;

namespace POS_Final_Year.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IGoodsServices _goodsServices;
        private readonly ICustomerServices _customerServices;
        private readonly ISupplierServices _supplierServices;
        private readonly IUserServices _userServices;

        public AdminController(IGoodsServices goodsServices, ICustomerServices customerServices, ISupplierServices supplierServices, IUserServices userServices)
        {
            _goodsServices = goodsServices;
            _customerServices = customerServices;
            _supplierServices = supplierServices;
            _userServices = userServices;
        }

        
        [HttpGet]
        [Route("GetAllGoods")]
        public async Task<IActionResult> GetAllGoods(string store_id, [FromQuery]string filter = null)
        {
            var query = _goodsServices.GetGoodsQueryable(); 
            var goods = await _goodsServices.GetAllGoodsAsync(query, store_id, filter);
            return Ok(goods);
        }
        
        [HttpGet]
        [Route("GetAllGoodsGroups")]
        public async Task<IActionResult> GetAllGoodsGroups(string store_id, [FromQuery] string filter = null)
        {
            var query = _goodsServices.GetGroupQueryable();
            var groups = await _goodsServices.GetAllGroupAsync(query, store_id, filter);
            return Ok(groups);
        }
      
        [HttpGet]
        [Route("GetAllGoodsProperties")]
        public async Task<IActionResult> GetAllGoodsProperties(string store_id)
        {
            var properties = await _goodsServices.GetAllGoodsPropertyAsync(store_id);
            return Ok(properties);
        }
        [HttpGet]
        [Route("GetAllGroupProperties")]
        public async Task<IActionResult> GetAllGroupProperties(string store_id, [FromQuery] string filter = null)
        {
            var query = _goodsServices.GetPropertyGroupQueryable();
            var properties = await _goodsServices.GetAllGroupPropertyAsync(query,store_id,filter);
            return Ok(properties);
        }
        
        [HttpGet]
        [Route("GetAllGoodsUnit")]
        public async Task<IActionResult> GetAllGoodsUnit(string store_id)
        {
            var properties = await _goodsServices.GetAllGoodsUnitAsync(store_id);
            return Ok(properties);
        }
        
        [HttpGet]
        [Route("GetAllSellPrice")]
        public async Task<IActionResult> GetAllSellPrice(string store_id )
        {
            var properties = await _goodsServices.GetAllSellPriceAsync(store_id);
            return Ok(properties);
        }
        
      
        

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers(string store_id, [FromQuery] string full_name =null)
        {
            var users = await _userServices.GetAllUser(store_id, full_name);
            return Ok(users);
        }

        [HttpGet]
        [Route("GetAllCustomers")]
        public async Task<IActionResult> GetAllCustomers(string company_id, string customer_id)
        {
            var customers = await _customerServices.GetAllCustomer(company_id, customer_id);
            return Ok(customers);
        }
        
        [HttpGet]
        [Route("GetAllSupplier")]
        public async Task<IActionResult> GetAllSupplier(string store_id, [FromQuery] string filter = null)
        {
            var query = _supplierServices.GetSuppliersQueryable();
            var customers = await _supplierServices.GetAllSupplier(query,store_id,filter);
            return Ok(customers);
        }
        
        [HttpPut("UpdateUser")]
        public async Task<ActionResult> PutTblUser(string store_id, string login_name,
            string full_name, string user_language, int user_type, int user_level, int use_status)
        {

            await _userServices
                .UpdateUser(store_id, login_name, full_name,user_language, user_type, user_level, use_status);
            return NoContent();
        }
    }
}