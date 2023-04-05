using AuthServer.API.Dto.User;
using AuthServer.API.Models;
using AutoMapper;

namespace AuthServer.API.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserReadDto>();
        CreateMap<UserCreateDto, User>()
            .ForMember(src => src.Roles, act => act.Ignore());
        CreateMap<User, UserCreateDto>()
            .ForMember(src => src.Roles, act => act.Ignore());
        CreateMap<UserUpdateDto, User>();
    }
}