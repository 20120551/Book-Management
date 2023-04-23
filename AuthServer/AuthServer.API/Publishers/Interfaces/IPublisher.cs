namespace AuthServer.API.Publisher.Interfaces;

public interface IPublisher
{
    Task PublishAsync<T>(string exchange, string type, string routingKey, T data) where T : class;
}