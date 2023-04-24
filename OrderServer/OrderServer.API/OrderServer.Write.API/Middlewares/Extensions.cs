using Microsoft.Extensions.DependencyInjection;

namespace OrderServer.Read.API.Middlewares
{
    public static class Extensions
    {
        public static IServiceCollection AddRequestMiddleware(this IServiceCollection services)
        {
            //var assembly = AppDomain.CurrentDomain.GetAssemblies();
            //services.Scan(s => s.FromAssemblies(assembly)
            //    .AddClasses(c => c.AssignableTo(typeof(IAsyncActionFilter)))
            //    .AsImplementedInterfaces()
            //    .WithScopedLifetime()
            //);

            services.AddScoped<OrderAuthorizationMiddleware>();
            return services;
        }
    }
}
