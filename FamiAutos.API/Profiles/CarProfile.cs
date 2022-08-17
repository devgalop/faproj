using AutoMapper;
using FamiAutos.API.Data.Entities;
using FamiAutos.Common.Models.Car;

namespace FamiAutos.API.Profiles;

public class CarProfile : Profile
{
    public CarProfile()
    {
        CreateMap<Car, AddCarModel>();
        CreateMap<AddCarModel, Car>();

        CreateMap<Car, UpdateCarModel>();
        CreateMap<UpdateCarModel, Car>();
    }
}