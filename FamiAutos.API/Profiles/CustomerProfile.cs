using AutoMapper;
using FamiAutos.API.Data.Entities;
using FamiAutos.Common.Models.Customer;

namespace FamiAutos.API.Profiles;

public class CustomerProfile : Profile
{
    public CustomerProfile()
    {
        CreateMap<AddCustomerModel, Customer>();
        CreateMap<Customer, AddCustomerModel>();

        CreateMap<UpdateCustomerModel, Customer>();
        CreateMap<Customer, UpdateCustomerModel>();

        CreateMap<Customer, CustomerModel>();
        CreateMap<CustomerModel, Customer>();

        CreateMap<Customer, CarCustomerModel>();
        CreateMap<CarCustomerModel, Customer>();
    }
}