using FamiAutos.API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FamiAutos.API.Data.Repositories;

public class CarRepository : ICarRepository
{
    private readonly DataContext _dataContext;

    public CarRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task AddCar(Car car)
    {
        _dataContext.Cars.Add(car);
        await _dataContext.SaveChangesAsync();
    }

    public async Task UpdateCar(Car car)
    {
        _dataContext.Cars.Update(car);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<Car?> GetCar(string plaque)
    {
        return await _dataContext.Cars
                            .Where(car => car.Plaque == plaque)
                            .FirstOrDefaultAsync();
    }

    public async Task DeleteCar(Car car)
    {
        _dataContext.Cars.Remove(car);
        await _dataContext.SaveChangesAsync();
    }

}