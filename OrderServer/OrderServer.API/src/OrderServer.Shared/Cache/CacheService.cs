using Newtonsoft.Json;
using StackExchange.Redis;

namespace OrderServer.Shared.Cache
{
    public class CacheService : ICacheService
    {
        private readonly IDatabase _redis;
        public CacheService(
            IConnectionMultiplexer connectionMultiplexer)
        {
            _redis = connectionMultiplexer.GetDatabase();
        }
        public async Task CreateAsync<TCache>(string cacheKey, TCache data, DateTimeOffset ttl)
        {
            // serialize data
            var serializeData = JsonConvert.SerializeObject(data);
            // set datetime
            var expireTime = ttl.DateTime.Subtract(DateTime.Now);
            await _redis.StringSetAsync(cacheKey, serializeData, expireTime);
        }

        public async Task<bool> DeleteAsync(string cacheKey)
        {
            var data = await _redis.KeyExistsAsync(cacheKey);
            if (!data)
            {
                return false;
            }
            await _redis.KeyDeleteAsync(cacheKey);
            return true;
        }

        public async Task<TCache?> GetAsync<TCache>(string cacheKey)
        {
            var data = await _redis.StringGetAsync(cacheKey);
            if (string.IsNullOrEmpty(data))
            {
                return default;
            }
            // deserilize data
            var deserializeData = JsonConvert.DeserializeObject<TCache>(data!);
            return deserializeData;
        }
    }
}
