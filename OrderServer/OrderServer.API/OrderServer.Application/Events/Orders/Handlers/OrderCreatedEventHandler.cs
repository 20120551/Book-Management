using OrderServer.Application.Exceptions;
using OrderServer.Domain.Factories;
using OrderServer.Domain.Repositories;
using OrderServer.Domain.ValueObjects;
using OrderServer.Shared.Events;

namespace OrderServer.Application.Events.Orders.Handlers
{
    public class OrderCreatedEventHandler : IEventHandler<OrderCreated>
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IUserRepo _userRepo;
        private readonly IOrderFactory _orderFactory;
        public OrderCreatedEventHandler(
            IOrderRepo orderRepo,
            IUserRepo userRepo,
            IOrderFactory orderFactory)
        {
            _orderFactory = orderFactory; 
            _userRepo = userRepo;
            _orderRepo = orderRepo;
        }
        public async Task HandleAsync(OrderCreated @event)
        {
            var (OrderId, MovieItems, Receiver, User) = @event;
            // check order exist or not
            var order = await _orderRepo.GetAsync(OrderId);
            if(order is not null)
            {
                // throw exception
                throw new ExistOrderException();
            }
            // create order (on read side)
            var _order = _orderFactory.Create(OrderId, Receiver, User, MovieItems);
            // create
            await _orderRepo.CreateAsync(_order);

            // add order to user table
            await _userRepo.UpdateAsync(User);
        }
    }
}
