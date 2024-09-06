using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblStore
{
    public string CompanyId { get; set; } = null!;

    public string StoreId { get; set; } = null!;

    public string? StoreName { get; set; }

    public string? StoreAddress { get; set; }

    public int? StoreStatus { get; set; }

    public string? StorePhone { get; set; }

    public string? StoreLogo { get; set; }

    public string? InvLanguage { get; set; }

    public string? LocalLanguage { get; set; }
}
