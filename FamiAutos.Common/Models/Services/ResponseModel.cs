namespace FamiAutos.Common.Models.Services;

public class ResponseModel
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; } = string.Empty;
    public string Result { get; set; } = string.Empty;
}