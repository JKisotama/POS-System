using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblGoodsproperty
{
    public string? GoodsId { get; set; }

    public string? PropertyId { get; set; }

    public string? PropertyName { get; set; }

    public string? EnglishValue { get; set; }

    public string? LocalValue { get; set; }

    public string? InvestValue { get; set; }

    public string? StoreId { get; set; }

    public virtual TblGood? Goods { get; set; }

    public virtual TblPropertygroup? Property { get; set; }
}
