using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Events.Orders
{
    // movieItems, Receiver, User
    public record OrderCreated(
        Guid OrderId,
        ICollection<EMovieItem> MovieItems,
        EReceiver Receiver,
        EUser User) : IEvent;

    public record EMovieItem(Guid MovieId, string Name, float Price, int Quantity, string Seat);
    public record EReceiver(string PhoneNumber, string FullName, string Address);
    public record EUser(Guid UserId, string Username, string FirstName, string LastName);
}
