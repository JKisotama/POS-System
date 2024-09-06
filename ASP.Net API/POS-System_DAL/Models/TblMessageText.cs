using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblMessageText
{
    public string MessageId { get; set; } = null!;

    public string? EnglishMessage { get; set; }

    public string? LocalMessage { get; set; }

    public string? InvestMessage { get; set; }
}
