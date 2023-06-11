using OrderServer.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Exceptions
{
    internal class EmptyUserIdException : OrderException
    {
        public EmptyUserIdException() : base("User Id cannot be empty")
        {
        }
    }
}
