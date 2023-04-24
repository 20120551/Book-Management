using AutoMapper;
using OrderServer.Application.DTO;
using OrderServer.Application.Exceptions;
using OrderServer.Domain.Repositories;
using OrderServer.Shared.Queries;

namespace OrderServer.Application.Queries.Handlers
{
    public class GetOrderHandler : IQueryHandler<GetOrder, OrderReadDto>
    {
        private IOrderRepo _orderRepo;
        private IMapper _mapper;
        public GetOrderHandler(
            IMapper mapper,
            IOrderRepo orderRepo)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
        }

        public async Task<OrderReadDto> QueryAsync(GetOrder query)
        {
            // get order
            var order = await _orderRepo.GetAsync(query.OrderId);
            // check order exist or not
            if(order is null)
            {
                throw new NotFoundOrderException();
            }
            //mapper
            var result = _mapper.Map<OrderReadDto>(order);
            return result;
        }
    }
}
