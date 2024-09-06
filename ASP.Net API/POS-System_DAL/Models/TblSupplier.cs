using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblSupplier
{
    public string SupplierId { get; set; } = null!;

    public string? SupplierName { get; set; }

    public int? SupllierType { get; set; }

    public string? SupllierAddress { get; set; }

    public string? SupllierPhone { get; set; }

    public string? SupllierEmail { get; set; }

    public int? AllowDebt { get; set; }

    public int? SupplierCounter { get; set; }

    public string? StoreId { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<TblGoodssupplied> TblGoodssupplieds { get; set; } = new List<TblGoodssupplied>();
}
