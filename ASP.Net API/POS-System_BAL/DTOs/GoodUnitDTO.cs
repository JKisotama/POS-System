using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.DTOs
{
    public class GoodUnitDTO
    {
        public int Id { get; set; }
        public string? GoodsId { get; set; }

        public string? Barcode { get; set; }

        public string? GoodsUnit { get; set; }

        public int? UnitSize { get; set; }

        public int? UnitStatus { get; set; }

        public int? UnitStock { get; set; }

        public string? StoreId { get; set; }
    }
}
