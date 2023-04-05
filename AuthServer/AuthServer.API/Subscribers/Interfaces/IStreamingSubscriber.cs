namespace AuthServer.API.Subscribers.Interfaces;

public interface IStreamingSubscriber
{
    Task SubscribeAsync<T>(string topic, Action<T> handler) where T : class;
}