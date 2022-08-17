using FamiAutos.API.Data.Entities;

namespace FamiAutos.API.Data.Repositories;

public interface ICarRepository
{
    Task AddCar(Car car);
    Task UpdateCar(Car car);
    Task<Car?> GetCar(string plaque);
    Task DeleteCar(Car car);
}