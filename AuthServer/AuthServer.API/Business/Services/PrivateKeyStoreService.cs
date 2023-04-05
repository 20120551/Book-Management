using AuthServer.API.Business.Interfaces;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Models;

namespace AuthServer.API.Business.Services;

public class PrivateKeyStoreService : IPrivateKeyStoreService
{
    private readonly IPrivateKeyStoreRepo _pkStoreRepo;

    public PrivateKeyStoreService(IPrivateKeyStoreRepo pkStoreRepo)
    {
        _pkStoreRepo = pkStoreRepo;
    }

    public async Task Create(PrivateKeyStore pk)
    {
        await _pkStoreRepo.Create(pk);
    }

    public async Task<PrivateKeyStore> GetByUserId(string id)
    {
        var pk = await _pkStoreRepo.GetPKByUserId(id);
        return pk;
    }
}