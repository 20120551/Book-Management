using System.Security.Cryptography;
using AuthServer.API.DataAccess.Interfaces;
using Jose;
using Newtonsoft.Json;

namespace AuthServer.API.DataAccess.Repo;

public class PublicKeyStoreJwkRepo : IPublicKeyStoreRepo
{
    public async Task Create(string kid, string pk)
    {
        // jwks set
        JwkSet jwks;
        RSA _publicKey = RSA.Create();
        var _publicKeyParams = JsonConvert.DeserializeObject<RSAParameters>(pk)!;
        _publicKey.ImportParameters(_publicKeyParams);
        var jwk = new Jwk(_publicKey, isPrivate: false)
        {
            Alg = "RSA",
            KeyId = kid
        };
        // store jwk to .well-known/jwks.json
        using (var streamReader = new StreamReader("wwwroot/.well-known/jwks.json"))
        {
            string jwksJsonFormat = await streamReader.ReadToEndAsync();
            //get jwk format
            jwks = JwkSet.FromJson(jwksJsonFormat, JWT.DefaultSettings.JsonMapper);
            jwks.Add(jwk);
        };

        using (var streamWriter = new StreamWriter("wwwroot/.well-known/jwks.json"))
        {
            await streamWriter.WriteAsync(jwks.ToJson(JWT.DefaultSettings.JsonMapper));
        };
    }

    public async Task Delete(Jwk jwk)
    {
        JwkSet jwks;
        using (var streamReader = new StreamReader("wwwroot/.well-known/jwks.json"))
        {
            string jwksJsonFormat = await streamReader.ReadToEndAsync();
            //get jwk format
            jwks = JwkSet.FromJson(jwksJsonFormat, JWT.DefaultSettings.JsonMapper);
        }
        // delete by kid
        jwks.ToList().Remove(jwk);
        // write to file
        using (var streamWriter = new StreamWriter("wwwroot/.well-known/jwks.json"))
        {
            await streamWriter.WriteAsync(jwks.ToJson(JWT.DefaultSettings.JsonMapper));
        };
    }

    public async Task<IEnumerable<Jwk>> GetAll()
    {
        JwkSet jwks;
        using (var streamReader = new StreamReader("wwwroot/.well-known/jwks.json"))
        {
            string jwksJsonFormat = await streamReader.ReadToEndAsync();
            //get jwk format
            jwks = JwkSet.FromJson(jwksJsonFormat, JWT.DefaultSettings.JsonMapper);
        };
        return jwks;
    }

    public async Task<Jwk?> GetPkByKid(string kid)
    {
        Jwk? publicKey = null;
        //get jwk set on .well-known/jwks.json
        using (var streamReader = new StreamReader("wwwroot/.well-known/jwks.json"))
        {
            string jwksJsonFormat = await streamReader.ReadToEndAsync();
            //get jwk format
            var jwks = JwkSet.FromJson(jwksJsonFormat, JWT.DefaultSettings.JsonMapper);
            publicKey = (
                from key in jwks
                where
                    key.Alg == "RSA" &&
                    key.Kty == Jwk.KeyTypes.RSA &&
                    key.KeyId == kid
                select key
            ).First();
        }
        return publicKey;
    }
}