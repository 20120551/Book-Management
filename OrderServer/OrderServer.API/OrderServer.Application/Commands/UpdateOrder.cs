using OrderServer.Shared.Commands;

namespace OrderServer.Application.Commands
{
    public record UpdateOrder(Guid OrderId) : ICommand;
}
