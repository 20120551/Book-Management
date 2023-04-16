using OrderServer.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Exceptions
{
    internal class EmptyPaymentIdException : OrderException
    {
        public EmptyPaymentIdException() : base("payment id cannot be empty")
        {
        }
    }
}
