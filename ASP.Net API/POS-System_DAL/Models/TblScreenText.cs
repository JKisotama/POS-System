using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblScreenText
{
    public string CompanyId { get; set; } = null!;

    public string StoreId { get; set; } = null!;

    public string ScreenName { get; set; } = null!;

    public string ItemName { get; set; } = null!;

    public string EnglishText { get; set; } = null!;

    public string? LocalText { get; set; }

    public string? InvestText { get; set; }
}
