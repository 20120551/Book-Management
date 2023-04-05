using AuthServer.API.Dto.Operation;
using AuthServer.API.Models;
using AutoMapper;

namespace AuthServer.API.Profiles;

public class OperationProfile : Profile
{
    public OperationProfile()
    {
        CreateMap<Operation, OperationReadDto>();
        CreateMap<OperationCreateDto, Operation>();
        CreateMap<Operation, OperationCreateDto>();
        CreateMap<OperationUpdateDto, Operation>();
    }
}