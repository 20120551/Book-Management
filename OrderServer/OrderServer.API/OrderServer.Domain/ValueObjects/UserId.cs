using OrderServer.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.ValueObjects
{
    public record UserId
    {
        public Guid Id { get; }
        public UserId(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new EmptyUserIdException();
            }
            Id = id;
        }

        public static implicit operator UserId(Guid id) => new(id);
        public static implicit operator Guid(UserId userId) => userId.Id;
    }
}
