using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace OrderServer.Shared.Cache
{
    public static class Extensions
    {
        public static IServiceCollection AddRedis(this IServiceCollection services)
        {
            // get configuration
            IConfiguration configuration;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                configuration = serviceProvider.GetService<IConfiguration>()!;
            }
            // binding options
            var section = configuration.GetSection("Redis");
            var options = new CacheOptions();
            section.Bind(options);
            // connect multiplexer
            var redis = ConnectionMultiplexer.Connect(options.ConnectionStrings);

            // add service
            services.AddSingleton<IConnectionMultiplexer>(redis);
            services.AddSingleton<ICacheService, CacheService>();
            return services;
        }
    }
}
