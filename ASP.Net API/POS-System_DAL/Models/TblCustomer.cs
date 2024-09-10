using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblCustomer
{
    public string CustomerId { get; set; } = null!;

    public string? CustomerName { get; set; }

    public string? CustomerAddress { get; set; }

    public string? CustomerPhone { get; set; }

    public string? CustomerEmail { get; set; }

    public int? Allowdebt { get; set; }

    public int? CustomerCounter { get; set; }

    public string? CompanyId { get; set; }

    public DateTime? CreatedDate { get; set; }
}
