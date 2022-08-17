using FamiAutos.API.Data.Entities;
using FamiAutos.API.Data.Repositories;
using FamiAutos.API.Helpers;
using FamiAutos.Common.Models.Car;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FamiAutos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReparationController : ControllerBase
{
    private readonly ILogger<ReparationController> _logger;
    private readonly IReparationRepository _reparationRepository;
    private readonly ICarRepository _carRepository;
    private readonly IMapperHelper _mapperHelper;

    public ReparationController(ILogger<ReparationController> logger,
                                IReparationRepository reparationRepository,
                                ICarRepository carRepository,
                                IMapperHelper mapperHelper)
    {
        _logger = logger;
        _reparationRepository = reparationRepository;
        _carRepository = carRepository;
        _mapperHelper = mapperHelper;
    }

    [HttpPost("AddReparation")]
    public async Task<IActionResult> AddReparation([FromBody] AddReparationModel model)
    {
        try
        {
            _logger.LogInformation($"Se asignará una nueva reparacion al auto: {model.CarPlaque}");
            if(string.IsNullOrEmpty(model.CarPlaque) || string.IsNullOrEmpty(model.Description)) throw new ArgumentException("Invalid Model");
            Car? carFound = await _carRepository.GetCar(model.CarPlaque);
            if(carFound == null) return NotFound($"El auto con placas {model.CarPlaque} NO existe en la base de datos");
            Reparation reparationEntity = _mapperHelper.ConvertTo<Reparation, AddReparationModel>(model);
            reparationEntity.CarId = carFound.Id;
            await _reparationRepository.CreateReparation(reparationEntity);
            return Ok(reparationEntity);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("GetReparation/{id}")]
    public async Task<IActionResult> GetReparation(int id)
    {
        try
        {
            _logger.LogInformation($"Se buscará la reparación con id: {id}");
            if(id <= 0 ) throw new ArgumentOutOfRangeException("Id no valido");
            Reparation? repartionFound = await _reparationRepository.GetReparation(id);
            if(repartionFound == null) return NotFound($"No existe ninguna reparación con id: {id}");
            return Ok(repartionFound);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("GetAllByCar/{carPlaque}")]
    public async Task<IActionResult> GetReparationsByCar(string carPlaque)
    {
        try
        {
            _logger.LogInformation($"Se buscará todas las reparaciones existentes para el auto: {carPlaque}");
            if(string.IsNullOrEmpty(carPlaque)) throw new ArgumentNullException("Placa invalida");
            Car? carFound = await _carRepository.GetCar(carPlaque);
            if(carFound == null) return NotFound($"El auto con placa {carPlaque} NO existe en la base de datos");
            List<Reparation> reparations = await _reparationRepository.GetReparationsByCar(carPlaque);
            _logger.LogInformation($"Se encontraron {reparations.Count()} reparaciones en la base de datos para el auto con placas {carPlaque}");
            return Ok(reparations);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpPost("UpdateReparation")]
    public async Task<IActionResult> UpdateReparation([FromBody] UpdateReparationModel reparation)
    {
        try
        {
            _logger.LogInformation($"Se actualizará la reparacion con id: {reparation.Id}");
            if(reparation.Id <= 0) throw new ArgumentOutOfRangeException("Id invalido");
            Reparation? reparationFound = await _reparationRepository.GetReparation(reparation.Id);
            if(reparationFound == null) return NotFound($"La reparacion con Id {reparation.Id} NO existe en la base de datos");
            reparationFound.Description = reparation.Description;
            reparationFound.CreatedAt = reparation.CreatedAt;
            reparationFound.GuaranteeMonths = reparation.GuaranteeMonths;
            await _reparationRepository.UpdateReparation(reparationFound);
            _logger.LogInformation($"Se ha actualizado con exito: \n {JsonConvert.SerializeObject(reparationFound)}");
            return Ok(reparationFound);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("DeleteReparation/{id}")]
    public async Task<IActionResult> DeleteReparation(int id)
    {
        try
        {
            _logger.LogInformation($"Se eliminará la reparacion con id: {id}");
            if(id <= 0) throw new ArgumentOutOfRangeException("Id invalido");
            Reparation? reparationFound = await _reparationRepository.GetReparation(id);
            if(reparationFound == null) return NotFound($"La reparacion con id {id} NO existe en la base de datos");
            await _reparationRepository.DeleteReparation(reparationFound);
            _logger.LogInformation($"Se ha eliminado la reparacion satisfactoriamente");
            return Ok("Se ha eliminado la reparacion satisfactoriamente");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

}