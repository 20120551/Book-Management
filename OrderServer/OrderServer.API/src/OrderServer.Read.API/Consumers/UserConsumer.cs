using OrderServer.Application.Events.Users;
using OrderServer.Shared.Dispatcher.Events;
using OrderServer.Shared.Messages;
using RabbitMQ.Client;

namespace OrderServer.Write.API.Consumers
{
    public class UserConsumer : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        public UserConsumer(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var subscriber = scope.ServiceProvider.GetService<ISubscriber>()!;
            var eventDispatcher = scope.ServiceProvider.GetService<IEventDispatcher>()!;

            await subscriber.ConsumeAsync<UserCreated>("user", ExchangeType.Topic, "user.created.#", async (data) =>
            {
                await eventDispatcher.DispatchAsync(data);   
            });

            await subscriber.ConsumeAsync<UserUpdated>("user", ExchangeType.Topic, "user.updated.#", async (data) =>
            {
                await eventDispatcher.DispatchAsync(data);
            });

            await subscriber.ConsumeAsync<UserDeleted>("user", ExchangeType.Topic, "user.deleted.#", async (data) =>
            {
                await eventDispatcher.DispatchAsync(data);
            });
        }
    }
}
