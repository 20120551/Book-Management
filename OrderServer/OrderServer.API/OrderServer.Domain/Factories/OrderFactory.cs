using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Factories
{
    public class OrderFactory : IOrderFactory
    {
        public Order Create(OrderId id, Receiver receiver, User user) => new Order(id, receiver, user);

        public Order Create(OrderId id, Receiver receiver, User user, List<MovieItem> movies)
        {
            var order = new Order(id, receiver, user);
            order.AddMovies(movies);
            return order;
        }
    }
}
