using OrderServer.Application.Exceptions;
using OrderServer.Domain.Repositories;
using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Events.Users.Handlers
{
    public class UserDeletedEventHandler : IEventHandler<UserDeleted>
    {
        private readonly IUserRepo _userRepo;
        public UserDeletedEventHandler(
            IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task HandleAsync(UserDeleted @event)
        {
            // check user exist or not
            var existedUser = await _userRepo.GetAsync(@event.UserId);
            if (existedUser is null)
            {
                // throw exception here
                throw new NotFoundUserException();
            }
            await _userRepo.DeleteAsync(existedUser);
        }
    }
}
