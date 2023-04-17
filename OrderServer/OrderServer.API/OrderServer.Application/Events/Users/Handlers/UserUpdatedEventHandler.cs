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
    public class UserUpdatedEventHandler : IEventHandler<UserUpdated>
    {
        private readonly IUserRepo _userRepo;
        public UserUpdatedEventHandler(
            IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task HandleAsync(UserUpdated @event)
        {
            // resolve event
            (Guid UserId, string FirstName, string LastName) = @event;
            // check user exist or not
            var existedUser = await _userRepo.GetAsync(UserId);
            if (existedUser is null)
            {
                // throw exception here
                throw new NotFoundUserException();
            }
            // change property
            existedUser.ChangeProperty(FirstName, LastName);
            await _userRepo.UpdateAsync(existedUser);
        }
    }
}
