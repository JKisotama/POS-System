using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblStatusText
{
    public int StatusId { get; set; }

    public string? EnglishName { get; set; }

    public string? LocalName { get; set; }

    public string? InvestName { get; set; }
}
