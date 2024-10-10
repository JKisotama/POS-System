using AutoMapper.Configuration.Annotations;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace POS_System_BAL.DTOs
{
    public class GoodsDTO
    {
        public string? GroupId { get; set; }

        public string? GoodsName { get; set; }

        public string? GoodsBrand { get; set; }

        public int? GoodsStatus { get; set; }

        public string StoreId {  get; set; }  
       
    }
}
