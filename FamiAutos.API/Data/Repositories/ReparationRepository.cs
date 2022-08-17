using FamiAutos.API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FamiAutos.API.Data.Repositories;

public class ReparationRepository : IReparationRepository
{
    private readonly DataContext _dataContext;

    public ReparationRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task CreateReparation(Reparation reparation)
    {
        _dataContext.Reparations.Add(reparation);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<Reparation?> GetReparation(int id)
    {
        return await _dataContext.Reparations
                        .Where(reparation => reparation.Id == id)
                        .FirstOrDefaultAsync();
    }

    public async Task<List<Reparation>> GetReparationsByCar(string plaque)
    {
        return await _dataContext.Reparations
                                    .Join(_dataContext.Cars, 
                                        reparation => reparation.CarId, 
                                        car => car.Id,
                                        (reparation, car) =>  new {Reparation = reparation, Car = car})
                                        .Where(car => car.Car.Plaque == plaque)
                                        .Select(result => result.Reparation)
                                        .ToListAsync();
    }

    public async Task UpdateReparation(Reparation reparation)
    {
        _dataContext.Reparations.Update(reparation);
        await _dataContext.SaveChangesAsync();
    }

    public async Task DeleteReparation(Reparation reparation)
    {
        _dataContext.Reparations.Remove(reparation);
        await _dataContext.SaveChangesAsync();
    }
}