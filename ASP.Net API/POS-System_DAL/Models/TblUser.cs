using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Swashbuckle.AspNetCore.Annotations;

namespace POS_System_DAL.Models;

public partial class TblUser
{
    public string StoreId { get; set; } = null!;

    public string LoginName { get; set; } = null!;

    public string? FullName { get; set; }

    public string? PassWord { get; set; }
    
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? DoB { get; set; }
    public string? Email { get; set; }
    public string? Gender { get; set; }

    public string? IdentifyString { get; set; }

    public string? UserLanguage { get; set; }

    public int UserType { get; set; }

    public int? UserLevel { get; set; }

    public int UserStatus { get; set; }
    [SwaggerIgnore]
    public string? Picture { get; set; } = null;
}
