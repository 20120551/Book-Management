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
        private readonly IOrderFactory _orderFactory;
        private readonly IUserFactory _userFactory;
        public OrderCreatedEventHandler(
            IOrderRepo orderRepo,
            IOrderFactory orderFactory,
            IUserFactory userFactory)
        {
            _orderFactory = orderFactory; 
            _orderRepo = orderRepo;
            _userFactory = userFactory;
        }
        public async Task HandleAsync(OrderCreated @event)
        {
            var (OrderId, MovieItems, Receiver, User) = @event;
            var (FullName, PhoneNumber, Address) = Receiver;
            var (UserId, Username, FirstName, LastName) = User;
            // check order exist or not
            var order = await _orderRepo.GetAsync(OrderId);
            if(order is not null)
            {
                // throw exception
                throw new ExistOrderException();
            }
            // create order (on read side)
            var _receiver = new Receiver(PhoneNumber, FullName, Address);
            var _user = _userFactory.Create(UserId, Username, FirstName, LastName);
            var _movieItems = new List<MovieItem>();
            foreach(var movie in MovieItems)
            {
                var (MovieId, Name, Price, Quantity, Seat) = movie;
                _movieItems.Add(new MovieItem(MovieId, Name, Price, Seat, Quantity));
            }

            var _order = _orderFactory.Create(OrderId, _receiver, _user, _movieItems);
            // create
            await _orderRepo.CreateAsync(_order);
        }
    }
}
