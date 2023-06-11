using OrderServer.Shared.Events;

namespace OrderServer.Shared.Messages
{
    public interface IPublisher
    {
        Task PublishAsync<TEvent>(
            string exchange, 
            string type, 
            string routingKey, 
            TEvent data) where TEvent : IEvent;  
    }
}
