using FamiAutos.API.Data.Entities;
using FamiAutos.API.Data.Enums;
using FamiAutos.API.Data.Repositories;
using FamiAutos.API.Helpers;
using FamiAutos.Common.Models.Accounting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FamiAutos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountingController : ControllerBase
{
    private readonly IAccountingRepository _repository;
    private readonly IMapperHelper _mapperHelper;
    private readonly ILogger<AccountingController> _logger;

    public AccountingController(IAccountingRepository repository,
                                IMapperHelper mapperHelper,
                                ILogger<AccountingController> logger)
    {
        _repository = repository;
        _mapperHelper = mapperHelper;
        _logger = logger;
        _logger.LogInformation("Inicia controlador de contabilidad");
    }

    [HttpPost("AddFlow")]
    public async Task<IActionResult> AddFlow([FromBody] AddAccountingModel model)
    {
        try
        {
            _logger.LogInformation("Inicia método para agregar egreso/ingreso");
            if (!ModelState.IsValid || string.IsNullOrEmpty(model.Description) || (model.FlowType < 0 || model.FlowType > 1) || model.Value <= 0) throw new Exception("El modelo es invalido");
            MoneyFlow flowEntity = _mapperHelper.ConvertTo<MoneyFlow, AddAccountingModel>(model);
            await _repository.AddMoneyFlow(flowEntity);
            _logger.LogInformation($"Se ha agregado el objeto satisfactoriamente en la base de datos. \n {JsonConvert.SerializeObject(model)}");
            return Ok(model);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error critico");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetFlow/{id}")]
    public async Task<IActionResult> GetFlow(int id)
    {
        try
        {
            _logger.LogInformation($"Buscará el ingreso/egreso con id: {id}");
            if(id <= 0) throw new ArgumentOutOfRangeException("No es un Id valido para consultar");
            MoneyFlow? flowFound = await _repository.GetMoneyFlow(id);
            if(flowFound == null) return NotFound("Ingreso/Egreso no encontrado. Por favor valide e intente nuevamente.");
            _logger.LogInformation($"Objeto encontrado: \n {JsonConvert.SerializeObject(flowFound)}");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error critico");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetFlowByDate/{YYYY}/{MM}/{DD}")]
    public async Task<IActionResult> GetFlowByDate(int YYYY, int MM, int DD)
    {
        try
        {
            _logger.LogInformation($"Buscará el ingreso/egreso con la fecha especfica: {DD}/{MM}/{YYYY}");
            if(YYYY <= 2000 || YYYY > DateTime.Now.Year || MM < 1 || MM >12 || DD < 1 || DD > 31) throw new ArgumentOutOfRangeException("Fecha invalida");
            var date = new DateTime(YYYY,MM,DD);
            IEnumerable<MoneyFlow>? flowFound = await _repository.GetMoneyFlowsByDate(date);
            if(flowFound == null || flowFound.Count() == 0) return NotFound($"No se encuentran registros para la fecha {date}");
            _logger.LogInformation($"Objeto encontrado: \n {JsonConvert.SerializeObject(flowFound)}");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error critico");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetFlowByMonth/{MM}")]
    public async Task<IActionResult> GetFlowByMonth(int MM)
    {
        try
        {
            _logger.LogInformation($"Buscará los ingreso/egreso que coincidan con el mes: {MM}");
            if(MM < 1 || MM >12) throw new ArgumentOutOfRangeException("Mes fuera de rango");
            IEnumerable<MoneyFlow>? flowFound = await _repository.GetMoneyFlowsByMonth(MM);
            if(flowFound == null || flowFound.Count() == 0) return NotFound($"No se encuentran registros para el mes {MM}");
            _logger.LogInformation($"Objeto encontrado: \n {JsonConvert.SerializeObject(flowFound)}");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error critico");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetFlowByYear/{YYYY}")]
    public async Task<IActionResult> GetFlowByYear(int YYYY)
    {
        try
        {
            _logger.LogInformation($"Buscará los ingreso/egreso que coincidan con el año: {YYYY}");
            if(YYYY <= 2000 || YYYY > DateTime.Now.Year) throw new ArgumentOutOfRangeException("Mes fuera de rango");
            IEnumerable<MoneyFlow>? flowFound = await _repository.GetMoneyFlowsByYear(YYYY);
            if(flowFound == null || flowFound.Count() == 0) return NotFound($"No se encuentran registros para el año {YYYY}");
            _logger.LogInformation($"Objeto encontrado: \n {JsonConvert.SerializeObject(flowFound)}");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error critico");
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("ModifyFlow")]
    public async Task<IActionResult> UpdateFlow([FromBody] UpdateAccountingModel model)
    {
        try
        {
            _logger.LogInformation($"Actualizará el ingreso/egreso que coincida con el id: {model.Id}");
            if (!ModelState.IsValid || model.Id < 0 || string.IsNullOrEmpty(model.Description) || (model.FlowType < 0 || model.FlowType > 1) || model.Value <= 0) throw new Exception("El modelo es invalido");
            MoneyFlow? flowFound = await _repository.GetMoneyFlow(model.Id);
            if(flowFound == null) return NotFound("Ingreso/Egreso no encontrado. Por favor valide e intente nuevamente.");
            _logger.LogInformation($"Objeto encontrado: \n {JsonConvert.SerializeObject(flowFound)}");
            flowFound.Description = model.Description;
            flowFound.FlowType = (EAccountingType)model.FlowType;
            flowFound.Value = model.Value;
            flowFound.CreatedAt = model.CreatedAt;
            await _repository.ModifyMoneyFlow(flowFound);
            _logger.LogInformation($"Objeto modificado: \n {JsonConvert.SerializeObject(flowFound)}");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error critico");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("DeleteFlow/{id}")]
    public async Task<IActionResult> DeleteFlow(int id)
    {
        try
        {
            _logger.LogInformation($"Eliminará el ingreso/egreso que coincida con el id: {id}");
            if(id <= 0) throw new ArgumentOutOfRangeException("No es un Id valido para consultar");
            MoneyFlow? flowFound = await _repository.GetMoneyFlow(id);
            if(flowFound == null) return NotFound("Ingreso/Egreso no encontrado. Por favor valide e intente nuevamente.");
            _logger.LogInformation($"Objeto encontrado: \n {JsonConvert.SerializeObject(flowFound)}");
            await _repository.DeleteMoneyFlow(flowFound);
            _logger.LogInformation("El Ingreso/Egreso ha sido eliminado de manera exitosa");
            return Ok("El Ingreso/Egreso ha sido eliminado de manera exitosa");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,"Error critico");
            return BadRequest(ex.Message);
        }
    }
}