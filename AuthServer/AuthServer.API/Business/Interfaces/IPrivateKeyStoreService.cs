using AuthServer.API.Models;

namespace AuthServer.API.Business.Interfaces;

public interface IPrivateKeyStoreService
{
    Task<PrivateKeyStore> GetByUserId(string id);
    Task Create(PrivateKeyStore pk);
}