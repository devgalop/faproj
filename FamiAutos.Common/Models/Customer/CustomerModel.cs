using FamiAutos.Common.Models.Car;

namespace FamiAutos.Common.Models.Customer;

public class CustomerModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Nit { get; set; } = string.Empty;
    public string Cellphone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public List<CustomerCarModel> OwnCars { get; set; } = null!;
}