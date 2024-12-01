// using Microsoft.AspNetCore.Mvc;
// using POS_System_BAL.Services.Customer;
// using POS_System_BAL.Services.Goods;
// using POS_System_BAL.Services.Receipt;
// using POS_System_BAL.Services.Supplier;
// using POS_System_BAL.Services.User;
//
// namespace POS_Final_Year.Controller
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class AdminController : ControllerBase
//     {
//         private readonly IGoodsServices _goodsServices;
//         private readonly ICustomerServices _customerServices;
//         private readonly IReceiptServices _receiptServices;
//         private readonly ISupplierServices _supplierServices;
//         private readonly IUserServices _userServices;
//
//         public AdminController(IGoodsServices goodsServices, ICustomerServices customerServices, IReceiptServices receiptServices, ISupplierServices supplierServices, IUserServices userServices)
//         {
//             _goodsServices = goodsServices;
//             _customerServices = customerServices;
//             _receiptServices = receiptServices;
//             _supplierServices = supplierServices;
//             _userServices = userServices;
//         }
//
//         [HttpGet]
//         [Route("GetAdmin")]
//         public IActionResult GetAdmin()
//         {
//             return Ok("Admin");
//         }
//
//         [HttpGet]
//         [Route("GetAdmin")]
//         public IActionResult GetAllGoods()
//         {
//             return Ok("Admin");
//         }
//
//         [HttpGet]
//         [Route("GetAdmin")]
//         public IActionResult GetAllGoodsGroup()
//         {
//             return Ok("Admin");
//         }
//
//         [HttpGet]
//         [Route("GetAdmin")]
//         public IActionResult GetAllGoodsProperty()
//         {
//             return Ok("Admin");
//         }
//     }
// }