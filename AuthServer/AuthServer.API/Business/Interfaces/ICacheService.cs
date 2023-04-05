namespace AuthServer.API.Business.Interfaces;

public interface ICacheService
{
    Task<T?> GetData<T>(string key);
    Task SetData<T>(string key, T data, DateTimeOffset expirationTime);
    Task<bool> RemoveData(string key);
}