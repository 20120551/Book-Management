using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Factories
{
    public class UserFactory : IUserFactory
    {
        public User Create(UserId id, string username, string firstName, string lastName) => new User(id, username, firstName, lastName);

        public User Create(UserId id, string username, string firstName, string lastName, List<Order> orders)
        {
            var user = new User(id, username, firstName, lastName);
            user.AddOrders(orders);
            return user;
        }
    }
}
