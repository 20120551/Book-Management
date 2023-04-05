using AuthServer.API.Publisher.Interfaces;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace AuthServer.API.Publisher.Services;

public class StreamingPublisher : IStreamingPublisher
{
    private readonly ISubscriber _subscriber;
    public StreamingPublisher(IConnectionMultiplexer connectionMultiplexer)
    {
        _subscriber = connectionMultiplexer.GetSubscriber();
    }
    public Task PublishAsync<T>(string topic, T data) where T : class
    {
        var payload = JsonConvert.SerializeObject(data);
        return _subscriber.PublishAsync(topic, payload);
    }
}