using AuthServer.API.Subscribers.Interfaces;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace AuthServer.API.Subscribers.Services;

public class StreamingSubscriber : IStreamingSubscriber
{
    private readonly ISubscriber _subscriber;

    public StreamingSubscriber(IConnectionMultiplexer connectionMultiplexer)
    {
        _subscriber = connectionMultiplexer.GetSubscriber();
    }
    public Task SubscribeAsync<T>(string topic, Action<T> handler) where T : class =>
    _subscriber.SubscribeAsync(topic, (_, data) =>
    {
        var payload = JsonConvert.DeserializeObject<T>(data!);
        if (payload == null)
        {
            return;
        }
        handler(payload);
    });
}