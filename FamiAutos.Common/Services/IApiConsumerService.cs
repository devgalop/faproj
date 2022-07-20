using FamiAutos.Common.Models.Services;

namespace FamiAutos.Common.Services;

public interface IApiConsumerService
{
    Task<ResponseModel> PostAsync(RequestModel request);
    Task<ResponseModel> PutAsync(RequestModel request);
    Task<ResponseModel> GetAsync(RequestModel request, string urlParameter);
    Task<ResponseModel> DeleteAsync(RequestModel request, string urlParameter);
}