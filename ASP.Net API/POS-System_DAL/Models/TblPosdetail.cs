using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace POS_System_DAL.Models;

public  class TblPosdetail
{
    [JsonIgnore]
    public int id { get; set; }
    public string PosNumber { get; set; } = null!;

    public int? ItemOrder { get; set; }

    public string? GoodsId { get; set; }

    public string? Barcode { get; set; }

    public string? GoodsName { get; set; }

    public string? ItemUnit { get; set; }

    public string? Property { get; set; }

    public string? PropertyValue { get; set; }

    public double ItemQuantity { get; set; }

    public double? ItemPrice { get; set; }

    public double? SubTotal { get; set; }

    public double? LineDiscount { get; set; }

    public double? LineTotal { get; set; }

    public string? StoreId { get; set; }

    public virtual TblPo PosNumberNavigation { get; set; } = null!;
}
