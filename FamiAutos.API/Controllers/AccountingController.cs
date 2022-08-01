using FamiAutos.API.Data.Entities;
using FamiAutos.API.Data.Enums;
using FamiAutos.API.Data.Repositories;
using FamiAutos.API.Helpers;
using FamiAutos.Common.Models.Accounting;
using Microsoft.AspNetCore.Mvc;

namespace FamiAutos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountingController : ControllerBase
{
    private readonly IAccountingRepository _repository;
    private readonly IMapperHelper _mapperHelper;

    public AccountingController(IAccountingRepository repository,
                                IMapperHelper mapperHelper)
    {
        _repository = repository;
        _mapperHelper = mapperHelper;
    }

    [HttpPost("AddFlow")]
    public async Task<IActionResult> AddFlow([FromBody] AddAccountingModel model)
    {
        try
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(model.Description) || (model.FlowType < 0 || model.FlowType > 1) || model.Value <= 0) throw new Exception("El modelo es invalido");
            MoneyFlow flowEntity = _mapperHelper.ConvertTo<MoneyFlow, AddAccountingModel>(model);
            await _repository.AddMoneyFlow(flowEntity);
            return Ok(model);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetFlow/{id}")]
    public async Task<IActionResult> GetFlow(int id)
    {
        try
        {
            if(id <= 0) throw new ArgumentOutOfRangeException("No es un Id valido para consultar");
            MoneyFlow? flowFound = await _repository.GetMoneyFlow(id);
            if(flowFound == null) return NotFound("Ingreso/Egreso no encontrado. Por favor valide e intente nuevamente.");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetFlowByDate/{YYYY}/{MM}/{DD}")]
    public async Task<IActionResult> GetFlowByDate(int YYYY, int MM, int DD)
    {
        try
        {
            if(YYYY <= 2000 || YYYY > DateTime.Now.Year || MM < 1 || MM >12 || DD < 1 || DD > 31) throw new ArgumentOutOfRangeException("Fecha invalida");
            var date = new DateTime(YYYY,MM,DD);
            IEnumerable<MoneyFlow>? flowFound = await _repository.GetMoneyFlowsByDate(date);
            if(flowFound == null || flowFound.Count() == 0) return NotFound($"No se encuentran registros para la fecha {date}");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetFlowByMonth/{MM}")]
    public async Task<IActionResult> GetFlowByMonth(int MM)
    {
        try
        {
            if(MM < 1 || MM >12) throw new ArgumentOutOfRangeException("Mes fuera de rango");
            IEnumerable<MoneyFlow>? flowFound = await _repository.GetMoneyFlowsByMonth(MM);
            if(flowFound == null || flowFound.Count() == 0) return NotFound($"No se encuentran registros para el mes {MM}");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("GetFlowByYear/{YYYY}")]
    public async Task<IActionResult> GetFlowByYear(int YYYY)
    {
        try
        {
            if(YYYY <= 2000 || YYYY > DateTime.Now.Year) throw new ArgumentOutOfRangeException("Mes fuera de rango");
            IEnumerable<MoneyFlow>? flowFound = await _repository.GetMoneyFlowsByYear(YYYY);
            if(flowFound == null || flowFound.Count() == 0) return NotFound($"No se encuentran registros para el año {YYYY}");
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("ModifyFlow")]
    public async Task<IActionResult> UpdateFlow([FromBody] UpdateAccountingModel model)
    {
        try
        {
            if (!ModelState.IsValid || model.Id < 0 || string.IsNullOrEmpty(model.Description) || (model.FlowType < 0 || model.FlowType > 1) || model.Value <= 0) throw new Exception("El modelo es invalido");
            MoneyFlow? flowFound = await _repository.GetMoneyFlow(model.Id);
            if(flowFound == null) return NotFound("Ingreso/Egreso no encontrado. Por favor valide e intente nuevamente.");
            flowFound.Description = model.Description;
            flowFound.FlowType = (EAccountingType)model.FlowType;
            flowFound.Value = model.Value;
            flowFound.CreatedAt = model.CreatedAt;
            await _repository.ModifyMoneyFlow(flowFound);
            return Ok(flowFound);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("DeleteFlow/{id}")]
    public async Task<IActionResult> DeleteFlow(int id)
    {
        try
        {
            if(id <= 0) throw new ArgumentOutOfRangeException("No es un Id valido para consultar");
            MoneyFlow? flowFound = await _repository.GetMoneyFlow(id);
            if(flowFound == null) return NotFound("Ingreso/Egreso no encontrado. Por favor valide e intente nuevamente.");
            await _repository.DeleteMoneyFlow(flowFound);
            return Ok("El Ingreso/Egreso ha sido eliminado de manera exitosa");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}