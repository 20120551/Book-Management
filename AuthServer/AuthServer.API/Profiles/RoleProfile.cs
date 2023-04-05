using AuthServer.API.Dto.Role;
using AuthServer.API.Dto.User;
using AuthServer.API.Extensions;
using AuthServer.API.Models;
using AutoMapper;

namespace AuthServer.API.Profiles;

public class RoleProfile : Profile
{
    public RoleProfile()
    {
        CreateMap<Role, RoleReadDto>();
        CreateMap<RoleCreateDto, Role>()
            .ForMember(src => src.Slug, act => act.MapFrom(src => src.Title.Slugify()));
        CreateMap<Role, RoleCreateDto>();
        CreateMap<RoleUpdateDto, Role>()
            .ForMember(src => src.Slug, act => act.MapFrom(src => src.Title.Slugify()));
        // CreateMap<Role, UserRoleDto>()
        //     .ForMember(src => src.RoleId, act => act.MapFrom(src => src.Id))
        //     .ForMember(src => src.RoleName, act => act.MapFrom(src => src.Name));
    }
}