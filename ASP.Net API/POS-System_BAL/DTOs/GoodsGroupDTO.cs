﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace POS_System_BAL.DTOs
{
    public class GoodsGroupDTO
    {
        
        public string GroupId { get; set; } = null!;
        public string? GroupName { get; set; }

        public int? GroupStatus { get; set; }

        public string StoreId { get; set; }
        [JsonIgnore]
        public int? GroupCounter { get; set; }
    }
}
