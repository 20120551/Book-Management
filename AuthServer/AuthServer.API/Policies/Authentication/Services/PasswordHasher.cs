using System.Security.Cryptography;
using AuthServer.API.Policies.Authentication.Interfaces;

namespace AuthServer.API.Policies.Authentication.Services;

public class PasswordHasher : IPasswordHasher
{
    private const int SaltSize = 128 / 8;
    private const int KeySize = 256 / 8;
    private const int Iterations = 10000;
    private const char Delimiter = '.';
    private static readonly HashAlgorithmName _hashAlgorithmName = HashAlgorithmName.SHA256;

    public string Hash(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, _hashAlgorithmName, KeySize);
        return string.Join(Delimiter, Convert.ToBase64String(salt), Convert.ToBase64String(hash));
    }

    public bool Verify(string hashPassword, string inputPassword)
    {
        var element = hashPassword.Split(Delimiter);
        var salt = Convert.FromBase64String(element[0]);
        var hash = Convert.FromBase64String(element[1]);

        var hashInput = Rfc2898DeriveBytes.Pbkdf2(inputPassword, salt, Iterations, _hashAlgorithmName, KeySize);

        return CryptographicOperations.FixedTimeEquals(hash, hashInput);
    }
}