using OrderServer.Application.Events.Orders;
using OrderServer.Application.Exceptions;
using OrderServer.Domain.Factories;
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
    public class CreateOrderHandler : ICommandHandler<CreateOrder>
    {
        private readonly ICartRepo _cartRepo;
        private readonly IOrderRepo _orderRepo;
        private readonly IUserRepo _userRepo;
        private readonly IOrderFactory _orderFactory;
        private readonly IPublisher _publisher;

        public CreateOrderHandler(
            ICartRepo cartRepo, 
            IOrderRepo orderRepo,
            IUserRepo userRepo,
            IOrderFactory orderFactory,
            IPublisher publisher)
        {
            _cartRepo = cartRepo;
            _orderRepo = orderRepo;
            _userRepo = userRepo;
            _orderFactory = orderFactory;
            _publisher = publisher;
        }

        async Task ICommandHandler<CreateOrder>.HandleAsync(CreateOrder command)
        {
            (Guid UserId, Guid CartId, Guid OrderId) = command;
            // get cart by id
            var cart = await _cartRepo.GetAsync(CartId);
            if(cart is null)
            {
                // throw exception
                throw new NotFoundCartException();
            }

            // get user by id
            var user = await _userRepo.GetAsync(UserId);
            if(user is null)
            {
                // throw exception
                throw new NotFoundUserException();
            }

            // create order instance
            var order = _orderFactory.Create(OrderId, cart.Receiver, user, cart.MovieItems);
            
            // create order in database
            await _orderRepo.CreateAsync(order);

            // add order to user
            user.AddOrder(order);
            await _userRepo.UpdateAsync(user);

            // publish event
            var @event = new OrderCreated(OrderId, cart.MovieItems, cart.Receiver, user);
            await _publisher.PublishAsync(
                "order", ExchangeType.Topic, "order.created", @event);
        }
    }
}
