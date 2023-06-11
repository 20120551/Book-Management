using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Events.Users
{
    public record UserCreated(Guid UserId, string Username, string FirstName, string LastName) : IEvent;
}
