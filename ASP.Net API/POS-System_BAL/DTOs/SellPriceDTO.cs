using POS_System_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS_System_BAL.DTOs
{
    public class SellPriceDTO
    {
        public int Id { get; set; }

        public string GoodsId { get; set; }

        public string? Barcode { get; set; }

        public string? GoodsUnit { get; set; }

        public int SellNumber { get; set; }

        public int SellPrice { get; set; }

        public string StoreId { get; set; }

    }
}
