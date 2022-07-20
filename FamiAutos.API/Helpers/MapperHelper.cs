using AutoMapper;

namespace FamiAutos.API.Helpers;

public class MapperHelper : IMapperHelper
{
    private readonly IMapper _mapper;

    public MapperHelper(IMapper mapper)
    {
        _mapper = mapper;
    }

    public OutputModel ConvertTo<OutputModel,InputModel>(InputModel model){
        var modelConverted = _mapper.Map<OutputModel>(model);
        return modelConverted;
    }
}