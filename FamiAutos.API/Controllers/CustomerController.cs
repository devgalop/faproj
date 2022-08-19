using FamiAutos.API.Data.Entities;
using FamiAutos.API.Data.Repositories;
using FamiAutos.API.Helpers;
using FamiAutos.Common.Models.Customer;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FamiAutos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly ILogger<CustomerController> _logger;
    private readonly IMapperHelper _mapperHelper;
    private readonly ICustomerRepository _customerRepository;

    public CustomerController(ILogger<CustomerController> logger,
                            IMapperHelper mapperHelper,
                            ICustomerRepository customerRepository)
    {
        _logger = logger;
        _mapperHelper = mapperHelper;
        _customerRepository = customerRepository;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> RegisterCustomer([FromBody] AddCustomerModel model)
    {
        try
        {
            _logger.LogInformation("Inicia método para registrar un nuevo cliente");
            if(string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Nit)) throw new ArgumentException("Invalid Model");
            Customer? customerFound = await _customerRepository.GetCustomerByNit(model.Nit);
            if(customerFound != null) throw new ArgumentException($"El cliente con Nit {model.Nit} ya se encuentra registrado en la base de datos");
            customerFound = await _customerRepository.GetCustomerByEmail(model.Email);
            if(customerFound != null) throw new ArgumentException($"El cliente con email {model.Email} ya se encuentra registrado en la base de datos");
            Customer customerEntity = _mapperHelper.ConvertTo<Customer,AddCustomerModel>(model);
            await _customerRepository.RegisterCustomer(customerEntity);
            _logger.LogInformation($"El cliente ha sido registrado en la base de datos satisfactoriamente. {JsonConvert.SerializeObject(customerEntity)}");
            return Ok(customerEntity);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("GetCustomerByEmail/{email}")]
    public async Task<IActionResult> GetCustomerByEmail(string email){
        try
        {
            _logger.LogInformation($"Buscará el cliente que coincida con el email: {email}");
            if(string.IsNullOrEmpty(email)) throw new ArgumentException("Email invalido");
            Customer? customerFound = await _customerRepository.GetCustomerByEmail(email);
            if(customerFound == null) return NotFound($"El cliente con email {email} NO existe en la base de datos");
            CustomerModel customer = _mapperHelper.ConvertTo<CustomerModel, Customer?>(customerFound);
            _logger.LogInformation($"Se ha encontrado el cliente: {JsonConvert.SerializeObject(customer)}");
            return Ok(customer);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("GetCustomerByNit/{nit}")]
    public async Task<IActionResult> GetCustomerByNit(string nit){
        try
        {
            _logger.LogInformation($"Buscará el cliente que coincida con el nit: {nit}");
            if(string.IsNullOrEmpty(nit)) throw new ArgumentException("NIT invalido");
            Customer? customerFound = await _customerRepository.GetCustomerByNit(nit);
            if(customerFound == null) return NotFound($"El cliente con nit {nit} NO existe en la base de datos");
            CustomerModel customer = _mapperHelper.ConvertTo<CustomerModel, Customer?>(customerFound);
            _logger.LogInformation($"Se ha encontrado el cliente: {JsonConvert.SerializeObject(customer)}");
            return Ok(customer);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("GetCustomerByCarPlaque/{plaque}")]
    public async Task<IActionResult> GetCustomerByCarPlaque(string plaque){
        try
        {
            _logger.LogInformation($"Buscará el cliente que coincida con la placa del auto: {plaque}");
            if(string.IsNullOrEmpty(plaque)) throw new ArgumentException("Placa invalida");
            Customer? customerFound = await _customerRepository.GetCustomerByCarPlaque(plaque);
            if(customerFound == null) return NotFound($"No existe ningun cliente asociado al auto {plaque}");
            CustomerModel customer = _mapperHelper.ConvertTo<CustomerModel, Customer?>(customerFound);
            _logger.LogInformation($"Se ha encontrado el cliente: {JsonConvert.SerializeObject(customer)}");
            return Ok(customer);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpPost("Update")]
    public async Task<IActionResult> UpdateCustomer([FromBody] UpdateCustomerModel model)
    {
        try
        {
            _logger.LogInformation("Inicia método para actualizar un nuevo cliente");
            if(model.Id <= 0) throw new ArgumentException("Invalid Model");
            Customer? customerFound = await _customerRepository.GetCustomer(model.Id);
            if(customerFound == null) return NotFound($"El cliente NO existe en la base de datos");
            customerFound.Name = model.Name;
            customerFound.Cellphone = model.Cellphone;
            customerFound.Address = model.Address;
            await _customerRepository.UpdateCustomer(customerFound);
            CustomerModel customer = _mapperHelper.ConvertTo<CustomerModel, Customer?>(customerFound);
            _logger.LogInformation($"El cliente ha sido modificado en la base de datos satisfactoriamente. {JsonConvert.SerializeObject(customer)}");
            return Ok(customer);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

    [HttpGet("Delete/{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        try
        {
            _logger.LogInformation("Inicia método para eliminar un nuevo cliente");
            if(id <= 0) throw new ArgumentException("Invalid Model");
            Customer? customerFound = await _customerRepository.GetCustomer(id);
            if(customerFound == null) return NotFound($"El cliente NO existe en la base de datos");
            await _customerRepository.DeleteCustomer(customerFound);
            _logger.LogInformation($"Se ha eliminado el cliente satisfactoriamente.");
            return Ok("Se ha eliminado el cliente satisfactoriamente");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error en la ejecución");
            return BadRequest(ex);
        }
    }

}