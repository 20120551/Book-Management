using AutoMapper;
using OrderServer.Application.DTO;
using OrderServer.Application.Exceptions;
using OrderServer.Domain.Entities;
using OrderServer.Domain.Repositories;
using OrderServer.Shared.Queries;

namespace OrderServer.Application.Queries.Handlers
{
    public class GetOrdersHandler : IQueryHandler<GetOrders, UserReadDto>
    {
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;

        public GetOrdersHandler(
            IMapper mapper,
            IUserRepo userRepo)
        {
            _userRepo = userRepo;
            _mapper = mapper;
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
            var result = _mapper.Map<User, UserReadDto>(user);
            return result;
        }
    }
}
