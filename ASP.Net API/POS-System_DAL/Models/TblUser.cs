using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblUser
{
    public string StoreId { get; set; } = null!;

    public string LoginName { get; set; } = null!;

    public string? FullName { get; set; }

    public string? PassWord { get; set; }

    public string? IdentifyString { get; set; }

    public string? UserLanguage { get; set; }

    public int? UserType { get; set; }

    public int? UserLevel { get; set; }

    public int? UserStatus { get; set; }
}
