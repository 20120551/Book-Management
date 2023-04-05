using AuthServer.API.Dto.Jwk;
using AutoMapper;
using Jose;

namespace AuthServer.API.Profiles;

public class PublicKeyStoreProfile : Profile
{
    public PublicKeyStoreProfile()
    {
        CreateMap<Jwk, JwkReadDto>()
            .ForMember(src => src.kid, act => act.MapFrom(dest => dest.KeyId));
    }
}