using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Factories
{
    public interface IOrderFactory
    {
        Order Create(OrderId id, Receiver receiver, User user);
        Order Create(OrderId id, Receiver receiver, User user, ICollection<MovieItem> movies);
    }
}
