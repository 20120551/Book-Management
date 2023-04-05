using AuthServer.API.Models;

namespace AuthServer.API.DataAccess.Interfaces;

public interface IPrivateKeyStoreRepo
{
    Task Create(PrivateKeyStore pk);
    Task<PrivateKeyStore> GetPKByUserId(string id);
}