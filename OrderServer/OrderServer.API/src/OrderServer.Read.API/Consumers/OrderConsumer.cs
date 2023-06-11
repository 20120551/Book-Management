using OrderServer.Application.Events.Orders;
using OrderServer.Application.Events.Users;
using OrderServer.Shared.Dispatcher.Events;
using OrderServer.Shared.Messages;
using RabbitMQ.Client;

namespace OrderServer.Write.API.Consumers
{
    public class OrderConsumer : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        public OrderConsumer(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var subscriber = scope.ServiceProvider.GetService<ISubscriber>()!;
            var eventDispatcher = scope.ServiceProvider.GetService<IEventDispatcher>()!;

            await subscriber.ConsumeAsync<OrderCreated>("order", ExchangeType.Topic, "order.created.#", async (data) =>
            {
                await eventDispatcher.DispatchAsync(data);   
            });

            await subscriber.ConsumeAsync<OrderUpdated>("order", ExchangeType.Topic, "order.updated.#", async (data) =>
            {
                await eventDispatcher.DispatchAsync(data);
            });

            await subscriber.ConsumeAsync<OrderDeleted>("order", ExchangeType.Topic, "order.deleted.#", async (data) =>
            {
                await eventDispatcher.DispatchAsync(data);
            });
        }
    }
}
