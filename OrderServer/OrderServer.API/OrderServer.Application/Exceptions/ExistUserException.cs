using OrderServer.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Exceptions
{
    internal class ExistUserException : OrderException
    {
        public ExistUserException(string username) : base($"{username} has existed on user collection")
        {
        }
    }
}
