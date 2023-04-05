using AuthServer.API.Dto.Jwk;

namespace AuthServer.API.Business.Interfaces;

public interface IPublicKeyStoreService
{
    Task<IEnumerable<JwkReadDto>> GetAll();
    Task<JwkReadDto> GetById(string kid);
    Task Delete(string kid);

}