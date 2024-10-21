using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblSellprice
{
    public int Id { get; set; }

    public string? GoodsId { get; set; }

    public string? Barcode { get; set; }

    public string? GoodsUnit { get; set; }

    public int? SellNumber { get; set; }

    public int SellPrice { get; set; }

    public string? StoreId { get; set; }

    public virtual TblGood? Goods { get; set; }
}
