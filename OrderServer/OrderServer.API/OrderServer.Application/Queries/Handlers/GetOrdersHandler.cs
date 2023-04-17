using OrderServer.Application.DTO;
using OrderServer.Application.Exceptions;
using OrderServer.Domain.Repositories;
using OrderServer.Shared.Queries;

namespace OrderServer.Application.Queries.Handlers
{
    public class GetOrdersHandler : IQueryHandler<GetOrders, UserReadDto>
    {
        private readonly IUserRepo _userRepo;

        public GetOrdersHandler(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<UserReadDto> QueryAsync(GetOrders query)
        {
            // check user exist or not
            var user = await _userRepo.GetAsync(query.UserId);
            if(user is null)
            {
                throw new NotFoundUserException();
            }
            // mapper
            return new UserReadDto();
        }
    }
}
