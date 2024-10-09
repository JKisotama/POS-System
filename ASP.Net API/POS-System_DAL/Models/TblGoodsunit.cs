using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace POS_System_DAL.Models;

public partial class TblGoodsunit
{
    
    public string? GoodsId { get; set; }

    public string? Barcode { get; set; }
    public string GoodsUnit { get; set; }

    public int? UnitSize { get; set; }

    public int? UnitStatus { get; set; }

    public int? UnitStock { get; set; }

    public string? StoreId { get; set; }

    public virtual TblGood? Goods { get; set; }

}
