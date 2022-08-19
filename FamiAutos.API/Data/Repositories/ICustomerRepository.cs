using FamiAutos.API.Data.Entities;

namespace FamiAutos.API.Data.Repositories;

public interface ICustomerRepository
{
    Task RegisterCustomer(Customer customer);
    Task<Customer?> GetCustomer(int id);
    Task<Customer?> GetCustomerByNit(string nit);
    Task<Customer?> GetCustomerByEmail(string email);
    Task<Customer?> GetCustomerByCarPlaque(string plaque);
    Task UpdateCustomer(Customer customer);
    Task DeleteCustomer(Customer customer);
}