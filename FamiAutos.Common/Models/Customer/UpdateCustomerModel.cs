namespace FamiAutos.Common.Models.Customer;

public class UpdateCustomerModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Cellphone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
}