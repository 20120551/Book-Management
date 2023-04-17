using Newtonsoft.Json;
using OrderServer.Shared.Events;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Messages
{
    public class Publisher : IPublisher
    {
        private readonly IConnection _connection;
        public Publisher(
            IConnection connection)
        {
            _connection= connection;
        }
        public Task PublishAsync<TEvent>(string exchange, string type, string routingKey, TEvent data) where TEvent : IEvent
        {
            using var channel = _connection.CreateModel();
            // assert exchange
            channel.ExchangeDeclare(exchange, type);
            // serialize data
            var serializeData = JsonConvert.SerializeObject(data);
            // bufferize
            var message = Encoding.UTF8.GetBytes(serializeData);
            // send message
            channel.BasicPublish(
                exchange,
                routingKey,
                mandatory: false,
                basicProperties: null,
                body: message);

            return Task.CompletedTask;
        }
    }
}
