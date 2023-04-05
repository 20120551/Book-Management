using System.Security.Cryptography;
using AuthServer.API.Configurations;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Models;
using Jose;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace AuthServer.API.DataAccess.Repo;

public class PublicKeyStoreCustomRepo : IPublicKeyStoreRepo
{
    private readonly IMongoCollection<PublicKeyStore> _pkStoreCollection;

    public PublicKeyStoreCustomRepo(IMongoCollection<PublicKeyStore> pkStoreCollection)
    {
        _pkStoreCollection = pkStoreCollection;
    }

    public async Task Create(string kid, string pk)
    {
        RSA publicKey = RSA.Create();
        var _publicKeyParams = JsonConvert.DeserializeObject<RSAParameters>(pk);
        publicKey.ImportParameters(_publicKeyParams);

        var jwk = new Jwk(publicKey, isPrivate: false)
        {
            Alg = "RSA",
            KeyId = kid
        };
        var pubKeyStore = new PublicKeyStore()
        {
            jwk = jwk
        };
        await _pkStoreCollection.InsertOneAsync(pubKeyStore);
    }

    public async Task Delete(Jwk jwk)
    {
        await _pkStoreCollection.DeleteOneAsync(p => p.jwk.KeyId == jwk.KeyId);
    }

    public async Task<IEnumerable<Jwk>> GetAll()
    {
        var pk = await _pkStoreCollection.Find(_ => true).ToListAsync();
        var jwks = pk.Select(p => p.jwk);
        return jwks;
    }

    public async Task<Jwk?> GetPkByKid(string kid)
    {
        var pk = await _pkStoreCollection.Find(p => p.jwk.KeyId == kid).FirstOrDefaultAsync();
        return pk?.jwk;
    }
}