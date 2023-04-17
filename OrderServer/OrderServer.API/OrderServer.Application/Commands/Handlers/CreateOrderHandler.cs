using OrderServer.Application.Exceptions;
using OrderServer.Domain.Factories;
using OrderServer.Domain.Repositories;
using OrderServer.Shared.Commands;
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

        public CreateOrderHandler(
            ICartRepo cartRepo, 
            IOrderRepo orderRepo,
            IUserRepo userRepo,
            IOrderFactory orderFactory)
        {
            _cartRepo = cartRepo;
            _orderRepo = orderRepo;
            _userRepo = userRepo;
            _orderFactory = orderFactory;
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

            // publish event

        }
    }
}
