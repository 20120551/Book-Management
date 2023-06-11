using Microsoft.Extensions.DependencyInjection;
using OrderServer.Domain.Repositories;
using OrderServer.Infrastructure.Shared.Repositories;
using OrderServer.Shared.Cache;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Shared
{
    public static class Extensions
    {
        public static IServiceCollection AddShared(this IServiceCollection services)
        {
            services.AddRedis();
            services.AddSingleton<ICartRepo, CartRepo>();
            return services;
        }
    }
}
