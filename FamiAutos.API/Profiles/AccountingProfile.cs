using AutoMapper;
using FamiAutos.API.Data.Entities;
using FamiAutos.Common.Models.Accounting;

namespace FamiAutos.API.Profiles;

public class AccountingProfile : Profile
{
    public AccountingProfile()
    {
        CreateMap<AddAccountingModel, MoneyFlow>();
        CreateMap<MoneyFlow, AddAccountingModel>();
    }
    
}