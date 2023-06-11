using OrderServer.Shared.Events;

namespace OrderServer.Shared.Messages
{
    public interface ISubscriber
    {
        Task ConsumeAsync<TEvent>(
            string exchange, 
            string type,
            string bindingKey, 
            Action<TEvent> handler) where TEvent : IEvent;
    }
}
