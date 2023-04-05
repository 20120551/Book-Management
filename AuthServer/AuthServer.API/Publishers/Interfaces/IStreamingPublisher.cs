namespace AuthServer.API.Publisher.Interfaces;

public interface IStreamingPublisher
{
    Task PublishAsync<T>(string topic, T data) where T : class;
}