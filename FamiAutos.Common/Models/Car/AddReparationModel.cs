namespace FamiAutos.Common.Models.Car;

public class AddReparationModel
{
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int GuaranteeMonths { get; set; }
    public string CarPlaque { get; set; } = string.Empty;
}