using OrderServer.Infrastructure.Read.Contexts;

namespace OrderServer.Read.API
{
    public class AppInitializer : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        public AppInitializer(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Console.WriteLine("running mongo config map...");
            using var scope = _serviceProvider.CreateScope();
            var mongoDbContext = scope.ServiceProvider.GetService<IMongoDbContext>()!;

            return mongoDbContext.ConfigureMapperAsync();
        }
    }
}
