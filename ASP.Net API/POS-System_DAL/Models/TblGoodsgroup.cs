using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblGoodsgroup
{
    public string GroupId { get; set; } = null!;

    public string? GroupName { get; set; }

    public int? GroupStatus { get; set; }

    public string? StoreId { get; set; }

    public int? GroupCounter { get; set; }

    public virtual ICollection<TblGood> TblGoods { get; set; } = new List<TblGood>();
}
