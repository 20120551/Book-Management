using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Dispatcher.Events
{
    public interface IEventDispatcher
    {
        Task DispatchAsync<TEvent>(TEvent @event) where TEvent : IEvent;
    }
}
