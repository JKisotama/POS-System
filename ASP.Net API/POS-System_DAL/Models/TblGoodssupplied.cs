using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblGoodssupplied
{
    public int GoodsId { get; set; }

    public string? SupplierId { get; set; }

    public string? GoodsName { get; set; }

    public string? StoreId { get; set; }

    public virtual TblSupplier? Supplier { get; set; }
}
