using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Domain
{
    public class Aggregation<T>
    {
        public T Guid { get; set; }
        private List<IDomainEvent> _event = new();
        public IEnumerable<IDomainEvent> Events
        {
            get
            {
                return _event;
            }
            private set { }
        }

        protected void AddEvent(IDomainEvent @event)
        {
            _event.Add(@event);
        }

        protected void ClearEvent() => _event.Clear();
    }
}
