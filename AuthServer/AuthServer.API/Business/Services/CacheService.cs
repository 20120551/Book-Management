using AuthServer.API.Business.Interfaces;
using AuthServer.API.Configurations;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace AuthServer.API.Business.Services;

public class CacheService : ICacheService
{
    private readonly IDatabase _cacheDb;
    public CacheService(IConnectionMultiplexer redis)
    {
        _cacheDb = redis.GetDatabase();
    }

    public async Task<T?> GetData<T>(string key)
    {
        string? data = await _cacheDb.StringGetAsync(key);
        if (String.IsNullOrEmpty(data))
        {
            return default;
        }
        var result = JsonConvert.DeserializeObject<T>(data);
        return result;
    }

    public async Task<bool> RemoveData(string key)
    {
        bool isExist = await _cacheDb.KeyExistsAsync(key);
        if (!isExist)
        {
            return false;
        }
        await _cacheDb.KeyDeleteAsync(key);
        return true;
    }

    public async Task SetData<T>(string key, T data, DateTimeOffset expirationTime)
    {
        var expiryTime = expirationTime.DateTime.Subtract(DateTime.Now);
        var serializeData = JsonConvert.SerializeObject(data);

        await _cacheDb.StringSetAsync(key, serializeData, expiryTime);
    }
}