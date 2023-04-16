using OrderServer.Domain.Entities;
using OrderServer.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Exceptions
{
    internal class ExistOrderException : OrderException
    {
        public ExistOrderException(User user) : base($"Order had exist on order list of user {user.Username}")
        {
        }
    }
}
