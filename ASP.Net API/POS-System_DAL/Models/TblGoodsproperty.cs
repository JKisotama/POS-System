using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS_System_DAL.Models;

public partial class TblGoodsproperty
{
    
    public string PropertyGoodsId { get; set; }
    public string? GoodsId { get; set; }

    public string? PropertyId { get; set; }

    public string? PropertyName { get; set; }

    public string? StoreId { get; set; }
    public int PropertyCounter { get; set; }

    public virtual TblGood? Goods { get; set; }

    public virtual TblPropertygroup? Property { get; set; }
}
