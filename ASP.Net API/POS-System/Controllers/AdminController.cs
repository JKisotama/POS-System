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
        public async Task<IActionResult> GetAllGoods(string store_id)
        {
            var goods = await _goodsServices.GetAllGoodsAsync(store_id);
            return Ok(goods);
        }
        
        [HttpGet]
        [Route("GetAllGoodsGroups")]
        public async Task<IActionResult> GetAllGoodsGroups(string store_id)
        {
            var groups = await _goodsServices.GetAllGroupAsync(store_id);
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
        public async Task<IActionResult> GetAllGroupProperties(string store_id)
        {
            var properties = await _goodsServices.GetAllGroupPropertyAsync(store_id);
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
        public async Task<IActionResult> GetAllSellPrice(string store_id)
        {
            var properties = await _goodsServices.GetAllSellPriceAsync(store_id);
            return Ok(properties);
        }
        
      
        

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers(string store_id)
        {
            var users = await _userServices.GetAllUser(store_id);
            return Ok(users);
        }

        [HttpGet]
        [Route("GetAllCustomers")]
        public async Task<IActionResult> GetAllCustomers(string company_id)
        {
            var customers = await _customerServices.GetAllCustomer(company_id);
            return Ok(customers);
        }
        
        [HttpGet]
        [Route("GetAllSupplier")]
        public async Task<IActionResult> GetAllSupplier(string store_id)
        {
            var customers = await _supplierServices.GetAllSupplier(store_id);
            return Ok(customers);
        }
        
        [HttpPut("UpdateUser")]
        public async Task<ActionResult> PutTblUser([FromQuery]TblUser user,string store_id, string login_name)
        {

            await _userServices
                .UpdateUser(user,store_id, login_name);
            return NoContent();
        }
    }
}