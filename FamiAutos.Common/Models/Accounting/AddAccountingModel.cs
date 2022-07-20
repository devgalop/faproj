namespace FamiAutos.Common.Models.Accounting;

public class AddAccountingModel
{
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int FlowType { get; set; }
    public double Value { get; set; }
}