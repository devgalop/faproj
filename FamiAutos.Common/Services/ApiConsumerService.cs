using System.Net;
using System.Net.Http.Headers;
using System.Text;
using FamiAutos.Common.Models.Services;

namespace FamiAutos.Common.Services;

public class ApiConsumerService : IApiConsumerService
{
    private HttpClient ConfigureClient(RequestModel request)
    {
        var handler = new HttpClientHandler();
        handler.ClientCertificateOptions = ClientCertificateOption.Manual;
        handler.ServerCertificateCustomValidationCallback =
            (httpRequestMessage, cert, cetChain, policyErrors) =>
        {
            return true;
        };
        HttpClient client = new HttpClient(handler)
        {
            BaseAddress = new Uri(request.UrlBase)
        };

        if (request.HasAuthorization)
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(request.TokenType, request.AccessToken);
        }

        return client;
    }

    public async Task<ResponseModel> PostAsync(RequestModel request)
    {
        try
        {
            using (HttpClient client = ConfigureClient(request))
            {
                StringContent content = new StringContent(request.Body, Encoding.UTF8, "application/json");
                string url = $"{request.ServicePrefix}{request.Controller}";
                ServicePointManager.ServerCertificateValidationCallback +=
                (sender, cert, chain, sslPolicyErrors) => true;
                HttpResponseMessage response = await client.PostAsync(url, content);
                string result = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    return new ResponseModel()
                    {
                        IsSuccess = false,
                        Message = result
                    };
                }

                return new ResponseModel()
                {
                    IsSuccess = true,
                    Result = result
                };
            }

        }
        catch (Exception ex)
        {
            return new ResponseModel()
            {
                IsSuccess = false,
                Message = ex.ToString()
            };
        }
    }

    public async Task<ResponseModel> PutAsync(RequestModel request)
    {
        try
        {
            HttpClient client = ConfigureClient(request);
            if (request.HasAuthorization)
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");
                client.DefaultRequestHeaders.Authorization = 
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", request.AccessToken);
                // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(request.TokenType, request.AccessToken);
            }
            StringContent content = new StringContent(request.Body, Encoding.UTF8, "application/json");
            string url = $"{request.ServicePrefix}{request.Controller}";
            HttpResponseMessage response = await client.PutAsync(url, content);
            string result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return new ResponseModel()
                {
                    IsSuccess = false,
                    Message = result
                };
            }

            return new ResponseModel()
            {
                IsSuccess = true,
                Result = result
            };
        }
        catch (Exception ex)
        {
            return new ResponseModel()
            {
                IsSuccess = false,
                Message = ex.ToString()
            };
        }
    }

    public async Task<ResponseModel> GetAsync(RequestModel request, string urlParameter)
    {
        try
        {
            HttpClient client = ConfigureClient(request);
            string url = $"{request.ServicePrefix}{request.Controller}/{urlParameter}";
            HttpResponseMessage response = await client.GetAsync(url);
            string result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return new ResponseModel()
                {
                    IsSuccess = false,
                    Message = result
                };
            }

            return new ResponseModel()
            {
                IsSuccess = true,
                Result = result
            };
        }
        catch (Exception ex)
        {
            return new ResponseModel()
            {
                IsSuccess = false,
                Message = ex.ToString()
            };
        }
    }

    public async Task<ResponseModel> DeleteAsync(RequestModel request, string urlParameter)
    {
        try
        {
            HttpClient client = ConfigureClient(request);
            string url = $"{request.ServicePrefix}{request.Controller}/{urlParameter}";
            HttpResponseMessage response = await client.DeleteAsync(url);
            string result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return new ResponseModel()
                {
                    IsSuccess = false,
                    Message = result
                };
            }

            return new ResponseModel()
            {
                IsSuccess = true,
                Result = result
            };
        }
        catch (Exception ex)
        {
            return new ResponseModel()
            {
                IsSuccess = false,
                Message = ex.ToString()
            };
        }
    }
}