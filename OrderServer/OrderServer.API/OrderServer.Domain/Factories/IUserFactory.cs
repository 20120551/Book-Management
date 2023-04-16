using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Factories
{
    public interface IUserFactory
    {
        User Create(UserId id, string username, string firstName, string lastName);
        User Create(UserId id, string username, string firstName, string lastName, List<Order> orders);
    }
}
