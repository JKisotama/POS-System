﻿using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblGoodsunit
{
    public string? GoodsId { get; set; } = null!;

    public string? Barcode { get; set; }

    public string? GoodsUnit { get; set; }

    public int? UnitSize { get; set; }

    public int? UnitStatus { get; set; }

    public int? UnitStock { get; set; }

    public string? StoreId { get; set; }

    public virtual TblGood? Goods { get; set; }
}
