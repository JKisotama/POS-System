using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblMenu
{
    public int MenuId { get; set; }

    public string? EnglishText { get; set; }

    public string? LocalText { get; set; }

    public string? InvestText { get; set; }

    public string? LinkedView { get; set; }

    public int? MenuOrder { get; set; }
    public string storeId { get; set; }
}
