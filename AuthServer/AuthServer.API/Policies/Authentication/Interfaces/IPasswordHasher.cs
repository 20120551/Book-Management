namespace AuthServer.API.Policies.Authentication.Interfaces;

public interface IPasswordHasher
{
    string Hash(string password);
    bool Verify(string hashPassword, string inputPassword);
}