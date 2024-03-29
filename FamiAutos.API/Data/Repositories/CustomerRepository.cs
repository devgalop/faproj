using FamiAutos.API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FamiAutos.API.Data.Repositories;

public class CustomerRepository : ICustomerRepository
{
    private readonly DataContext _dataContext;

    public CustomerRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task RegisterCustomer(Customer customer){
        _dataContext.Customers.Add(customer);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<Customer?> GetCustomer(int id){
        return await _dataContext.Customers
                                    .Include(customer => customer.OwnCars)
                                    .Where(customer => customer.Id == id)
                                    .FirstOrDefaultAsync();
    }

    public async Task<Customer?> GetCustomerByNit(string nit){
        return await _dataContext.Customers
                                    .Include(customer => customer.OwnCars)
                                    .Where(customer => customer.Nit == nit)
                                    .FirstOrDefaultAsync();
    }

    public async Task<Customer?> GetCustomerByEmail(string email){
        return await _dataContext.Customers
                                    .Include(customer => customer.OwnCars)
                                    .Where(customer => customer.Email == email)
                                    .FirstOrDefaultAsync();
    }

    public async Task<Customer?> GetCustomerByCarPlaque(string plaque)
    {
        return await _dataContext.Customers
                                    .Include(customer => customer.OwnCars)
                                    .Join(_dataContext.Cars,
                                        customer => customer.Id,
                                        cars => cars.OwnerId,
                                        (customer, cars) => new {Customer = customer, Cars = cars}
                                    ).Where(car => car.Cars.Plaque == plaque)
                                    .Select(result => result.Customer)
                                    .FirstOrDefaultAsync();
    }

    public async Task UpdateCustomer(Customer customer){
        _dataContext.Customers.Update(customer);
        await _dataContext.SaveChangesAsync();
    }

    public async Task DeleteCustomer(Customer customer){
        _dataContext.Customers.Remove(customer);
        await _dataContext.SaveChangesAsync();
    }
}