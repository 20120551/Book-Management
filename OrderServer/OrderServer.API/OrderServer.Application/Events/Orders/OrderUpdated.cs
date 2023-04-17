using OrderServer.Domain.Enums;
using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Events.Orders
{
    public record OrderUpdated(Guid OrderId, StateEnum State) : IEvent;
}
