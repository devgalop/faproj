using FamiAutos.API.Data.Entities;

namespace FamiAutos.API.Data.Repositories;

public interface IAccountingRepository
{
    Task AddMoneyFlow(MoneyFlow flow);
    Task<MoneyFlow?> GetMoneyFlow(int id);
    Task<IEnumerable<MoneyFlow>> GetMoneyFlowsByDate(DateTime date);
    Task<IEnumerable<MoneyFlow>> GetMoneyFlowsByMonth(int month);
    Task<IEnumerable<MoneyFlow>> GetMoneyFlowsByYear(int year);
    Task ModifyMoneyFlow(MoneyFlow flow);
    Task DeleteMoneyFlow(MoneyFlow flow);
}