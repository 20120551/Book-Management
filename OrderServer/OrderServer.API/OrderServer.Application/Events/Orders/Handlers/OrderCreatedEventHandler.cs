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
            _orderRepo = orderRepo;
            _userRepo = userRepo;
        }
        public async Task HandleAsync(OrderCreated @event)
        {
            var (OrderId, MovieItems, Receiver, User) = @event;
            var user = await _userRepo.GetAsync(User.UserId);

            // create order (on read side)
            var _order = _orderFactory.Create(OrderId, Receiver);
            _order.AddMovies(MovieItems);
            // create
            await _orderRepo.CreateAsync(_order);

            // update user
            user.AddOrder(_order);
            await _userRepo.UpdateAsync(user);
        }
    }
}
