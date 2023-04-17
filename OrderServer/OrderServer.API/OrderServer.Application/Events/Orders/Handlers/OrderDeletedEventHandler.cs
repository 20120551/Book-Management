using OrderServer.Application.Exceptions;
using OrderServer.Domain.Repositories;
using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Events.Orders.Handlers
{
    public class OrderDeletedEventHandler : IEventHandler<OrderDeleted>
    {
        private readonly IOrderRepo _orderRepo;
        public OrderDeletedEventHandler(
            IOrderRepo orderRepo)
        {
            _orderRepo= orderRepo;
        }
        public async Task HandleAsync(OrderDeleted @event)
        {
            var (OrderId, State) = @event;
            var order = await _orderRepo.GetAsync(OrderId);
            if (order == null)
            {
                //exception here
                throw new NotFoundOrderException();
            }
            order.ChangeState(State);
            await _orderRepo.UpdateAsync(order);
        }
    }
}
