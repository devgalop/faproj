namespace FamiAutos.API.Helpers;

public interface IMapperHelper
{
    OutputModel ConvertTo<OutputModel,InputModel>(InputModel model);
}