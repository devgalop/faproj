using FamiAutos.API.Data.Entities;

namespace FamiAutos.API.Data.Repositories;

public interface IReparationRepository
{
    Task CreateReparation(Reparation reparation);
    Task<Reparation?> GetReparation(int id);
    Task<List<Reparation>> GetReparationsByCar(string plaque);
    Task UpdateReparation(Reparation reparation);
    Task DeleteReparation(Reparation reparation);
}