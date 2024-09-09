﻿using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblGood
{
    public string? GroupId { get; set; }

    public string GoodsId { get; set; } = null!;

    public string? GoodsName { get; set; }

    public string? GoodsBrand { get; set; }

    public int? GoodsStatus { get; set; }

    public string? StoreId { get; set; }

    public int? GoodsCounter { get; set; }

    public byte[] Picture { get; set; } = null!;

    public virtual TblGoodsgroup? Group { get; set; }

    public virtual ICollection<TblSellprice> TblSellprices { get; set; } = new List<TblSellprice>();
}