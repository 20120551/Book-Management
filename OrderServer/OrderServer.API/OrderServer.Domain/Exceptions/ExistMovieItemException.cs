using OrderServer.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Exceptions
{
    internal class ExistMovieItemException : OrderException
    {
        public ExistMovieItemException() 
            : base("Movie item had existed on order")
        {
        }
    }
}
