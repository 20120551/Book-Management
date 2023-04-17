using OrderServer.Application.DTO;
using OrderServer.Shared.Queries;
namespace OrderServer.Application.Queries
{
    public record GetOrder(Guid OrderId) : IQuery<OrderReadDto>;
}
