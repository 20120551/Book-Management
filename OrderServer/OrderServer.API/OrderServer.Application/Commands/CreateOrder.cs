using OrderServer.Shared.Commands;
namespace OrderServer.Application.Commands
{
    public record CreateOrder(Guid CartId, Guid OrderId, Guid UserId) : ICommand;
}
