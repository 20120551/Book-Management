using Newtonsoft.Json;
using OrderServer.Shared.Events;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Messages
{
    public class Subscriber : ISubscriber
    {
        private readonly IConnection _connection;
        public Subscriber(
            IConnection connection)
        {
            _connection= connection;
        }
        public Task ConsumeAsync<TEvent>(string exchange, string type, string bindingKey, Action<TEvent> handler) where TEvent : IEvent
        {
            Console.WriteLine($"Consume event at exchange {exchange} type {type} with binding key {bindingKey}");
            //create channel
            var channel = _connection.CreateModel();
            //assert exchange
            channel.ExchangeDeclare(exchange, type);
            var queue = channel.QueueDeclare().QueueName;
            // binding queue
            channel.QueueBind(
                queue,
                exchange,
                routingKey: bindingKey);
            // create consumer
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, eventArgs) =>
            {
                Console.WriteLine($"Consume message on event {typeof(TEvent)}");
                var body = eventArgs.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                // deserialize data
                var deserializeData = JsonConvert.DeserializeObject<TEvent>(message)!;
                // handle event
                handler(deserializeData);
            };

            channel.BasicConsume(queue, false, consumer);
            return Task.CompletedTask;
        }
    }
}
