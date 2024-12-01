namespace POS_System_BAL.DTOs;

public class PosDTO
{
    public string PosNumber { get; set; } = null!;
    public DateTime PosDate { get; set; }
    public string? CashierId { get; set; }
    public int PosCounter { get; set; }
    public string StoreId { get; set; }
    public double? PosTotal { get; set; }
    public double? PosDiscount { get; set; }
    public double? PosTopay { get; set; }
}