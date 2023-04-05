using System.Security.Cryptography;
using Newtonsoft.Json;

namespace AuthServer.API.Utils;

public static class KeyPairGenerator
{
    private static RSACryptoServiceProvider csp = new RSACryptoServiceProvider();
    public static (string publicKey, string privateKey) Generate()
    {
        RSAParameters _publicKey = csp.ExportParameters(false);
        RSAParameters _privateKey = csp.ExportParameters(true);

        var result = (publicKey: "", privateKey: "");

        result.publicKey = JsonConvert.SerializeObject(_publicKey);
        result.privateKey = JsonConvert.SerializeObject(_privateKey);
        return result;
    }
}