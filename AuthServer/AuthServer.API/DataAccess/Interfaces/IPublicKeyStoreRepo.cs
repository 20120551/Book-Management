using Jose;

namespace AuthServer.API.DataAccess.Interfaces;

public interface IPublicKeyStoreRepo
{
    Task Create(string kid, string pk);
    Task<Jwk?> GetPkByKid(string kid);
    Task<IEnumerable<Jwk>> GetAll();
    Task Delete(Jwk jwk);
}