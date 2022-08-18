namespace FamiAutos.Common.Models.Car;

public class ReparationCarModel
{
    public int Id { get; set; }
    public string Plaque { get; set; } = string.Empty;
    public int OwnerId { get; set; }
}