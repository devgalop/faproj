namespace FamiAutos.Common.Models.Car;

public class AddCarModel
{
    public string Plaque { get; set; } = string.Empty;
    public int Model { get; set; }
    public string Brand { get; set; } = string.Empty;
    public int OwnerId { get; set; }
}