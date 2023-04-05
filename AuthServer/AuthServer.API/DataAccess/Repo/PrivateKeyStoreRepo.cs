using AuthServer.API.Configurations;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace AuthServer.API.DataAccess.Repo;

public class PrivateKeyStoreRepo : IPrivateKeyStoreRepo
{
    private readonly IMongoCollection<PrivateKeyStore> _pkStoreCollection;
    public PrivateKeyStoreRepo(IMongoCollection<PrivateKeyStore> pkStoreCollection)
    {
        _pkStoreCollection = pkStoreCollection;
    }

    public async Task Create(PrivateKeyStore pk)
    {
        await _pkStoreCollection.InsertOneAsync(pk);
    }

    public async Task<PrivateKeyStore> GetPKByUserId(string id)
    {
        var pk = await _pkStoreCollection.Find(c => c.Id == id).FirstOrDefaultAsync();
        return pk;
    }
}