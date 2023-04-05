using AuthServer.API.Models;

namespace AuthServer.API.Policies.Authentication.Interfaces;

public interface ITokenGenerator
{
    (string accessToken, string refreshToken) Sign(User payload, string privateKey);
    Task<Dictionary<string, object>> Verify(string token);
}