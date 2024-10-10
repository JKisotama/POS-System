using AutoMapper;
using Microsoft.AspNetCore.Http;
using POS_System_BAL.DTOs;
using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.Mapping
{
    public class AutoMappers : Profile
    {
        public AutoMappers()
        {
            CreateMap<TblSupplier, SupplierDTO>()
                .ReverseMap();
            CreateMap<TblCustomer, CustomerDTO>()
                .ReverseMap();
            CreateMap<TblGoodsunit, GoodUnitDTO>()
                .ReverseMap();
            CreateMap<TblGood, GoodsDTO>()
                .ReverseMap();
            CreateMap<TblGoodsgroup, GoodsGroupDTO>()
                .ReverseMap();
            CreateMap<TblUser, UserDTO>()
                .ReverseMap();
            CreateMap<TblSellprice, SellPriceDTO>()
                .ReverseMap();
        }
    }

    
}
