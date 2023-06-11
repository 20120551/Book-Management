using OrderServer.Application.Events.Orders;
using OrderServer.Application.Exceptions;
using OrderServer.Domain.Enums;
using OrderServer.Domain.Repositories;
using OrderServer.Shared.Commands;
using OrderServer.Shared.Messages;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Commands.Handlers
{
    public class DeleteOrderHandler : ICommandHandler<DeleteOrder>
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IPublisher _publisher;
        public DeleteOrderHandler(
            IOrderRepo orderRepo,
            IPublisher publisher)
        {
            _orderRepo = orderRepo;
            _publisher = publisher;
        }
        public async Task HandleAsync(DeleteOrder command)
        {
            var order = await _orderRepo.GetAsync(command.OrderId);
            if (order == null)
            {
                throw new NotFoundOrderException();
            }
            order.ChangeState(StateEnum.Canceled);
            await _orderRepo.UpdateAsync(order);
            // publish event
            var @event = new OrderDeleted(command.OrderId, StateEnum.Canceled);

            await _publisher.PublishAsync(
                "order", ExchangeType.Topic, "order.deleted", @event);
        }
    }
}
