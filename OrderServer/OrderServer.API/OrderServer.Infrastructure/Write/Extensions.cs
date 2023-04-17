using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OrderServer.Domain.Repositories;
using OrderServer.Infrastructure.Write.Repositories;
using OrderServer.Infrastructure.Write.Contexts;
using OrderServer.Infrastructure.Write.Options;

namespace OrderServer.Infrastructure.Write
{
    public static class Extensions
    {
        public static IServiceCollection AddWriteSide(this IServiceCollection services)
        {
            // get configuration
            using var serviceProvider = services.BuildServiceProvider();
            var configuration = serviceProvider.GetService<IConfiguration>()!;

            // binding options
            var section = configuration.GetSection("Postgres");
            var options = new PostgresOptions();
            section.Bind(options);

            // add dbcontext
            services.AddDbContext<AppDbContext>(
                o => o.UseNpgsql(options.ConnectionString));

            services.AddScoped<IOrderRepo, OrderRepo>();
            services.AddScoped<IUserRepo, UserRepo>();
            return services;
        }
    }
}
