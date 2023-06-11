using OrderServer.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.ValueObjects
{
    public record OrderId
    {
        public Guid Id { get; }
        public OrderId(Guid id)
        {
            if(id == Guid.Empty)
            {
                // throw exception
                throw new EmptyOrderIdException();
            }    
            Id = id;
        }

        public static implicit operator Guid(OrderId orderId) => orderId.Id;
        public static implicit operator OrderId(Guid guid) => new(guid);
    }
}
