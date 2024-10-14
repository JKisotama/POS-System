using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace POS_System_BAL.DTOs
{
    public class CustomerDTO
    {
        
        public string CustomerId { get; set; } = null!;

        public string? CustomerName { get; set; }

        public string? CustomerAddress { get; set; }

        public string? CustomerPhone { get; set; }

        public string? CustomerEmail { get; set; }

        public int? Allowdebt { get; set; }

        public int? CustomerCounter { get; set; }

        [JsonIgnore]
        public string? CompanyId { get; set; }

        public DateTime? CreatedDate { get; set; }
    }
}
