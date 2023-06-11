using Microsoft.Extensions.DependencyInjection;
using OrderServer.Infrastructure.Read.Configs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read.Contexts
{
    public class AppDbContext : IMongoDbContext
    {
        private readonly IServiceProvider _serviceProvier;
        public AppDbContext(
            IServiceProvider serviceProvider)
        {
            _serviceProvier = serviceProvider;
        }
        public Task ConfigureMapperAsync()
        {
            using var scope = _serviceProvier.CreateScope();
            var mongoMapperServices = scope.ServiceProvider.GetServices<IMongoMapper>();

            foreach(var mongoMapperService in mongoMapperServices)
            {
                mongoMapperService.Register();
            }

            return Task.CompletedTask;
        }
    }
}
