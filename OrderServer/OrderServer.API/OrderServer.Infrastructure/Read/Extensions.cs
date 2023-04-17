using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using OrderServer.Domain.Repositories;
using OrderServer.Infrastructure.Read.Options;
using OrderServer.Infrastructure.Read.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read
{
    public static class Extensions
    {
        public static IServiceCollection AddReadSide(this IServiceCollection services)
        {
            // get configuration
            using var serviceProvider = services.BuildServiceProvider();
            var configuration = serviceProvider.GetService<IConfiguration>()!;

            // binding options
            var section = configuration.GetSection("Mongo");
            var options = new MongoOptions();
            section.Bind(options);

            // get connection
            var mongoClient = new MongoClient(options.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(options.Database);

            // inject
            services.AddSingleton<IMongoDatabase>(mongoDatabase);
            services.AddSingleton<IOrderRepo, OrderRepo>();
            services.AddSingleton<IUserRepo, UserRepo>();

            return services;
        }
    }
}
