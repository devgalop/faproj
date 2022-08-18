using FamiAutos.Common.Models.Customer;

namespace FamiAutos.Common.Models.Car;

public class CarModel
{
    public int Id { get; set; }
    public string Plaque { get; set; } = string.Empty;
    public int Model { get; set; }
    public string Brand { get; set; } = string.Empty;
    public CarCustomerModel Owner { get; set; } = null!;
    public List<CarReparationModel> Revisions { get; set; } = null!;
}