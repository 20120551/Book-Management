using Microsoft.Extensions.DependencyInjection;
using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Dispatcher.Events
{
    public class EventDispatcher : IEventDispatcher
    {
        private readonly IServiceProvider _serviceProvider;
        public EventDispatcher(
            IServiceProvider serviceProvider)
        {
            _serviceProvider= serviceProvider;
        }
        public Task DispatchAsync<TEvent>(TEvent @event) where TEvent : IEvent
        {
            // create scope
            using var scrope = _serviceProvider.CreateScope();
            // get handler
            var handler = scrope.ServiceProvider.GetService<IEventHandler<TEvent>>()!;
            return handler.HandleAsync(@event);
        }
    }
}
