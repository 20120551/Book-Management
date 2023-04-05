using AuthServer.API.Dto.Permission;
using AuthServer.API.Extensions;
using AuthServer.API.Models;
using AutoMapper;

namespace AuthServer.API.Profiles;

public class PermissionProfile : Profile
{
    public PermissionProfile()
    {
        CreateMap<Permission, PermissionReadDto>();
        CreateMap<PermissionCreateDto, Permission>()
            .ForMember(src => src.Slug, act => act.MapFrom(dest => dest.Title.Slugify()));
        CreateMap<Permission, PermissionCreateDto>();
        CreateMap<PermissionUpdateDto, Permission>()
            .ForMember(src => src.Slug, act => act.MapFrom(dest => dest.Title.Slugify()));
    }
}