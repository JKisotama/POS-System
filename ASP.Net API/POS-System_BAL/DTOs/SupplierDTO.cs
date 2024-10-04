using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace POS_System_BAL.DTOs
{
    public class SupplierDTO
    {

        public string SupplierId { get;  set; }
        public string? SupplierName { get; set; }
        public int? SupllierType { get; set; }

        public string? SupllierAddress { get; set; }

        public string? SupllierPhone { get; set; }

        public string? SupllierEmail { get; set; }

        public int? AllowDebt { get; set; }

        public int SupplierCounter { get; set; }

        public string? StoreId { get; set; }

        public DateTime? CreatedDate { get; set; }
    }
}
