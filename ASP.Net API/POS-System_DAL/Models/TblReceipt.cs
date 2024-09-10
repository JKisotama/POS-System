using System;
using System.Collections.Generic;

namespace POS_System_DAL.Models;

public partial class TblReceipt
{
    public string ReceiptNumber { get; set; } = null!;

    public DateTime? ReceiptDate { get; set; }

    public string? SupplierId { get; set; }

    public string? SupplierName { get; set; }

    public int? ReceiptStatus { get; set; }

    public double? ReceiptTotal { get; set; }

    public double? ReceiptDiscount { get; set; }

    public double? ReceiptTopay { get; set; }

    public double? SupplierTopay { get; set; }

    public int? PaymentType { get; set; }

    public int? PaymentMethod { get; set; }

    public int? ReceiptCounter { get; set; }

    public string? ReceiptCreator { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string? PaymentPerson { get; set; }

    public DateTime? CancelDate { get; set; }

    public string? CancelPerson { get; set; }

    public DateTime? UpdateDate { get; set; }

    public string? UpdatePerson { get; set; }

    public int? PaymenyStatus { get; set; }

    public DateTime? ReceivedDate { get; set; }

    public string? StoreId { get; set; }
}
