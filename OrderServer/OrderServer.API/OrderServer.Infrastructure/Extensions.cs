using Microsoft.Extensions.DependencyInjection;
using OrderServer.Infrastructure.Read;
using OrderServer.Infrastructure.Shared;
using OrderServer.Infrastructure.Write;

namespace OrderServer.Infrastructure
{
    public static class Extensions
    {
        public static IServiceCollection AddReadInfrastructure(this IServiceCollection services)
        {
            services.AddShared();
            services.AddReadSide();
            return services;
        }

        public static IServiceCollection AddWriteInfrastructure(this IServiceCollection services)
        {
            services.AddShared();
            services.AddWriteSide();
            return services;
        }
    }
}
