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
    public class UpdateOrderHandler : ICommandHandler<UpdateOrder>
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IPublisher _publisher;

        public UpdateOrderHandler(
            IOrderRepo orderRepo,
            IPublisher publisher)
        {
            _orderRepo = orderRepo;
            _publisher = publisher;
        }
        public async Task HandleAsync(UpdateOrder command)
        {
            var order = await _orderRepo.GetAsync(command.OrderId);
            if (order == null)
            {
                throw new NotFoundOrderException();
            }

            // get state
            var state = Enum.Parse<StateEnum>(command.State);
            order.ChangeState(state);
            await _orderRepo.UpdateAsync(order);

            //publish event
            var @event = new OrderUpdated(command.OrderId, state);
            await _publisher.PublishAsync(
                "order",
                ExchangeType.Topic,
                $"order.{command.State.ToLower()}",
                @event);
        }
    }
}
