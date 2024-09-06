using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblPropertygroup
{
    public string PropertyId { get; set; } = null!;

    public string? PropertyName { get; set; }

    public string? StoreId { get; set; }

    public int? PropertyCounter { get; set; }
}
