using Microsoft.Extensions.DependencyInjection;
using OrderServer.Application.Exceptions;
using OrderServer.Domain.Factories;
using OrderServer.Domain.Repositories;
using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Events.Users.Handlers
{
    public class UserCreatedEventHandler : IEventHandler<UserCreated>
    {
        private readonly IUserRepo _userRepo;
        private readonly IUserFactory _userFactory;

        public UserCreatedEventHandler(
            IUserRepo userRepo,
            IUserFactory userFactory)
        {
            _userRepo = userRepo;
            _userFactory = userFactory;
        }
        public async Task HandleAsync(UserCreated @event)
        {
            // resolve event
            (Guid UserId, string Username, string FirstName, string LastName) = @event;
            // check user exist or not
            var existedUser = await _userRepo.GetAsync(UserId);
            if(existedUser is not null)
            {
                // throw exception here
                throw new ExistUserException(Username);
            }
            // generate user
            var user = _userFactory.Create(UserId, Username, FirstName, LastName);
            await _userRepo.CreateAsync(user);
        }
    }
}
