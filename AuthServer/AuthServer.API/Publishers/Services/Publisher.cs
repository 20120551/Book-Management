using System.Text;
using AuthServer.API.Publisher.Interfaces;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace AuthServer.API.Publisher.Services;

public class Publisher : IPublisher
{
    private readonly IConnection _connection;
    public Publisher(
        IConnection connection
    )
    {
        _connection = connection;
    }
    public Task PublishAsync<T>(string exchange, string type, string routingKey, T data) where T : class
    {
        Console.WriteLine($"Publishing message on exchange {exchange} type {type} with routing key {routingKey}");
        // create exchange
        using var channel = _connection.CreateModel();
        channel.ExchangeDeclare(exchange, type);

        // serialize data
        var serializeData = JsonConvert.SerializeObject(data);
        var bytes = Encoding.UTF8.GetBytes(serializeData);
        // send data
        channel.BasicPublish(exchange, routingKey, false, null, bytes);
        return Task.CompletedTask;
    }
}