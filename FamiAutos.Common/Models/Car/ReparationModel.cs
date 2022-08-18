namespace FamiAutos.Common.Models.Car;

public class ReparationModel
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int GuaranteeMonths { get; set; }
    public int CarId { get; set; }
    public ReparationCarModel Car { get; set; } = null!;
}