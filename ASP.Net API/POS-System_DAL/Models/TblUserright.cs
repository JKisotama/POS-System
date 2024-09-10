using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblUserright
{
    public int RightId { get; set; }

    public string? LoginName { get; set; }

    public int? MenuId { get; set; }

    public int? Assigned { get; set; }

    public string? StoreId { get; set; }

    public virtual TblUser? LoginNameNavigation { get; set; }

    public virtual TblMenu? Menu { get; set; }
}
