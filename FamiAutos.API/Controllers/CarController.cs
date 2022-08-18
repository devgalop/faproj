using FamiAutos.API.Data.Entities;
using FamiAutos.API.Data.Repositories;
using FamiAutos.API.Helpers;
using FamiAutos.Common.Models.Car;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FamiAutos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarController : ControllerBase
{
    private readonly ILogger<CarController> _logger;
    private readonly ICarRepository _carRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IMapperHelper _mapperHelper;

    public CarController(ILogger<CarController> logger,
                        ICarRepository carRepository,
                        ICustomerRepository customerRepository,
                        IMapperHelper mapperHelper)
    {
        _logger = logger;
        _carRepository = carRepository;
        _customerRepository = customerRepository;
        _mapperHelper = mapperHelper;
    }

    [HttpPost("AddCar")]
    public async Task<IActionResult> AddCar(AddCarModel model)
    {
        try
        {
            _logger.LogInformation("Se agregará un auto a la base de datos");
            if(string.IsNullOrEmpty(model.Plaque)) throw new ArgumentNullException("Invalid Model");
            Car? carFound = await _carRepository.GetCar(model.Plaque);
            if(carFound != null) throw new Exception($"El auto con placas: {model.Plaque} ya se encuentra registrado en la base de datos.");
            Customer? customerFound = await _customerRepository.GetCustomer(model.OwnerId);
            if(customerFound == null) throw new Exception($"El propietario con Id {model.OwnerId} NO se encuentra registrado en la base de datos");
            Car carEntity = _mapperHelper.ConvertTo<Car,AddCarModel>(model);
            await _carRepository.AddCar(carEntity);
            _logger.LogInformation($"Se registro el auto satisfactoriamente. {JsonConvert.SerializeObject(model)}");
            return Ok(carEntity);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("GetCar/{plaque}")]
    public async Task<IActionResult> GetCar(string plaque)
    {
        try
        {
            _logger.LogInformation($"Se buscará el auto con placa: {plaque}");
            if(string.IsNullOrEmpty(plaque) ) throw new ArgumentException("No es una placa valida para consultar");
            Car? carFound = await _carRepository.GetCar(plaque);
            if(carFound == null) return NotFound($"El auto con placa {plaque} no existe en la base de datos");
            CarModel car = _mapperHelper.ConvertTo<CarModel,Car>(carFound);
            _logger.LogInformation($"Se encontró el auto: {JsonConvert.SerializeObject(car)}");
            return Ok(car);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpPost("UpdateCar")]
    public async Task<IActionResult> UpdateCar([FromBody] UpdateCarModel model)
    {
        try
        {
            _logger.LogInformation("Se agregará un auto a la base de datos");
            if(string.IsNullOrEmpty(model.Plaque)) throw new ArgumentNullException("Invalid Model");
            Car? carFound = await _carRepository.GetCar(model.Plaque);
            if(carFound == null) return NotFound($"El auto con placas: {model.Plaque} NO se encuentra registrado en la base de datos.");
            carFound.Model = model.Model;
            carFound.Brand = model.Brand;
            await _carRepository.UpdateCar(carFound);
            CarModel car = _mapperHelper.ConvertTo<CarModel,Car>(carFound);
            _logger.LogInformation($"Se ha actualizado el auto satisfactoriamente. {JsonConvert.SerializeObject(car)}");
            return Ok(car);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("DeleteCar/{plaque}")]
    public async Task<IActionResult> DeleteCar(string plaque)
    {
        try
        {
            _logger.LogInformation($"Se eliminará el auto con placa {plaque}");
            if(string.IsNullOrEmpty(plaque)) throw new ArgumentNullException("La placa no es valida");
            Car? carFound = await _carRepository.GetCar(plaque);
            if(carFound == null) return NotFound($"El auto con placa {plaque} NO existe en la base de datos");
            await _carRepository.DeleteCar(carFound);
            _logger.LogInformation($"El auto con placa {plaque} fue eliminado con éxito");
            return Ok("El auto se ha eliminado con éxito");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

}