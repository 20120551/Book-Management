using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Cache
{
    public interface ICacheService
    {
        Task<TCache?> GetAsync<TCache>(string cacheKey);
        Task CreateAsync<TCache>(string cacheKey, TCache data, DateTimeOffset ttl);
        Task<bool> DeleteAsync(string cacheKey);
    }
}
