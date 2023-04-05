using System.Security.Cryptography;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Models;
using AuthServer.API.Policies.Authentication.Interfaces;
using Jose;
using Newtonsoft.Json;

namespace AuthServer.API.Policies.Authentication.Services;

public class TokenGenerator : ITokenGenerator
{
    private readonly IPublicKeyStoreRepo _publicKeyRepo;

    public TokenGenerator(IPublicKeyStoreRepo publicKeyRepo)
    {
        _publicKeyRepo = publicKeyRepo;
    }
    public (string accessToken, string refreshToken) Sign(User payload, string privateKey)
    {
        var _privateKeyParams = JsonConvert.DeserializeObject<RSAParameters>(privateKey)!;
        //gen key params
        RSA _privateKey = RSA.Create();
        _privateKey.ImportParameters(_privateKeyParams);

        var header = new Dictionary<string, object>()
        {
            {"typ", "JWT"},
            {"cty", "JWT"},
            {"kid", payload.Kid}
        };

        var roles = from r in payload.Roles select new { Id = r.Id, Name = r.Name };
        var accessTokenPayload = new Dictionary<string, object>()
        {
            {"id", payload.Id},
            {"sub", payload.Username},
            {"jti", Guid.NewGuid().ToString()},
            {"roles", JsonConvert.SerializeObject(roles)},
            {"exp", DateTime.UtcNow.AddMinutes(30)}
        };

        var refreshTokenPayload = new Dictionary<string, object>()
        {
            {"id", payload.Id},
            {"sub", payload.Username},
            {"jti", Guid.NewGuid().ToString()},
            {"roles", JsonConvert.SerializeObject(roles)},
            {"exp", DateTime.UtcNow.AddDays(7)}
        };

        string accessToken = JWT.Encode(accessTokenPayload, _privateKey, JwsAlgorithm.RS256, extraHeaders: header);
        string refreshToken = JWT.Encode(refreshTokenPayload, _privateKey, JwsAlgorithm.RS256, extraHeaders: header);

        var result = (accessToken: "", refreshToken: "");
        result.accessToken = accessToken;
        result.refreshToken = refreshToken;

        return result;
    }

    public async Task<Dictionary<string, object>> Verify(string token)
    {
        var headers = JWT.Headers(token);

        var isCorrectAlg = String.Equals((string)headers["alg"], "RS256", StringComparison.InvariantCultureIgnoreCase);
        if (!isCorrectAlg)
        {
            throw new Exception("Wrong alg");
        }

        //get public key
        var publicKey = await _publicKeyRepo.GetPkByKid((string)headers["kid"]);

        if (publicKey == null)
        {
            throw new Exception("unvalid token");
        }


        var payload = JWT.Decode(token, publicKey);

        var result = JsonConvert.DeserializeObject<Dictionary<string, object>>(payload)!;

        var expireDate = (DateTime)result["exp"];

        if (DateTime.Compare(expireDate, DateTime.UtcNow) < 0)
        {
            throw new Exception("Token Expired");
        }
        return result;
    }
}