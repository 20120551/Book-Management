using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using OrderServer.Shared.Events;

namespace OrderServer.Application.Events.Orders
{
    // movieItems, Receiver, User
    public record OrderCreated(
        Guid OrderId,
        ICollection<MovieItem> MovieItems,
        Receiver Receiver,
        EUser User) : IEvent;

    //public record EMovieItem(Guid MovieId, string Name, float Price, int Quantity, string Seat);
    //public record EReceiver(string PhoneNumber, string FullName, string Address);
    public record EUser(Guid UserId, string Username);
}
