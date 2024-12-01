using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblPo
{
    public string PosNumber { get; set; } = null!;

    public DateTime PosDate { get; set; }

    public string? CashierId { get; set; }

    public string? CustomerId { get; set; }

    public string? CustomerName { get; set; }

    public int? PosStatus { get; set; }

    public double? PosTotal { get; set; }

    public double? PosDiscount { get; set; }

    public double? PosTopay { get; set; }

    public double? PosCustomerpay { get; set; }

    public double? PosExchange { get; set; }

    public int? PosPaymenttype { get; set; }

    public int? PosPaymentmethod { get; set; }

    public int PosCounter { get; set; }

    public string? PosCreator { get; set; }

    public DateTime? Paymentdate { get; set; }

    public string? Payer { get; set; }

    public DateTime? CancelDate { get; set; }

    public string? CancelPerson { get; set; }

    public string StoreId { get; set; }
}
