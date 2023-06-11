using OrderServer.Domain.Entities;
using OrderServer.Domain.Repositories;
using OrderServer.Domain.ValueObjects;
using OrderServer.Shared.Cache;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Shared.Repositories
{
    public class CartRepo : ICartRepo
    {
        private readonly ICacheService _cacheService;
        public CartRepo(
            ICacheService cacheService)
        {
            _cacheService = cacheService;
        }
        public Task DeleteAsync(Cart cart)
        {
            var key = cart.Id.Guid.ToString();
            return _cacheService.DeleteAsync(key);
        }

        public Task<Cart?> GetAsync(CartId id)
        {
            var key = id.Guid.ToString();
            return _cacheService.GetAsync<Cart>(key);
        }
    }
}
