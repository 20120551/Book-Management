using AuthServer.API.Business.Interfaces;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Dto.Jwk;
using AuthServer.API.Exceptions.Handler;
using AutoMapper;
using Jose;

namespace AuthServer.API.Business.Services;

public class PublicKeyStoreService : IPublicKeyStoreService
{
    private readonly IPublicKeyStoreRepo _publicKeyStoreRepo;
    private readonly IMapper _mapper;

    public PublicKeyStoreService(
        IPublicKeyStoreRepo publicKeyStoreRepo,
        IMapper mapper)
    {
        _publicKeyStoreRepo = publicKeyStoreRepo;
        _mapper = mapper;
    }
    public async Task Delete(string kid)
    {
        var jwk = await _publicKeyStoreRepo.GetPkByKid(kid);
        if (jwk == null)
        {
            throw new DomainBadRequestException("Not found jwk with that kid");
        }

        await _publicKeyStoreRepo.Delete(jwk);
    }

    public async Task<IEnumerable<JwkReadDto>> GetAll()
    {
        var jwks = await _publicKeyStoreRepo.GetAll();
        var jwksResponse = _mapper.Map<IEnumerable<JwkReadDto>>(jwks);
        return jwksResponse;
    }

    public async Task<JwkReadDto> GetById(string kid)
    {
        var jwk = await _publicKeyStoreRepo.GetPkByKid(kid);
        if (jwk == null)
        {
            throw new DomainBadRequestException("Not found jwk with that kid");
        }
        var jwkResponse = _mapper.Map<JwkReadDto>(jwk);
        return jwkResponse;
    }
}