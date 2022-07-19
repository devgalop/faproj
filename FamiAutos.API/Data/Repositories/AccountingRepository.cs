using FamiAutos.API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FamiAutos.API.Data.Repositories;

public class AccountingRepository : IAccountingRepository
{
    private readonly DataContext _dataContext;

    public AccountingRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task AddMoneyFlow(MoneyFlow flow)
    {
        _dataContext.MoneyFlows.Add(flow);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<MoneyFlow?> GetMoneyFlow(int id)
    {
        return await _dataContext.MoneyFlows
                .Where(flow => flow.Id == id)
                .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<MoneyFlow>> GetMoneyFlowsByDate(DateTime date)
    {
        return await _dataContext.MoneyFlows
                .Where(flow => flow.CreatedAt == date).ToListAsync();
    }

    public async Task<IEnumerable<MoneyFlow>> GetMoneyFlowsByMonth(int month)
    {
        return await _dataContext.MoneyFlows
                .Where(flow => flow.CreatedAt.Month == month).ToListAsync();
    }

    public async Task<IEnumerable<MoneyFlow>> GetMoneyFlowsByYear(int year)
    {
        return await _dataContext.MoneyFlows
                .Where(flow => flow.CreatedAt.Year == year).ToListAsync();
    }

    public async Task ModifyMoneyFlow(MoneyFlow flow)
    {
        _dataContext.MoneyFlows.Update(flow);
        await _dataContext.SaveChangesAsync();
    }

    public async Task DeleteMoneyFlow(MoneyFlow flow)
    {
        _dataContext.Remove(flow);
        await _dataContext.SaveChangesAsync();
    }
}