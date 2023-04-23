using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderServer.Application.Queries;
using OrderServer.Read.API.Middlewares;
using OrderServer.Shared.Dispatcher.Queries;
using System.Security.Claims;

namespace OrderServer.Read.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IQueryDispatcher _queryDispatcher;
        public OrderController(
            IQueryDispatcher queryDispatcher)
        {
            _queryDispatcher = queryDispatcher;
        }

        [Authorize(AuthenticationSchemes = "KONG_AUTHENTICATION_SCHEME")]
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
            var query = new GetOrders(Guid.Parse(userId));

            var result = await _queryDispatcher.DispatchAsync(query);

            return Ok(result);
        }

        [Authorize(AuthenticationSchemes = "KONG_AUTHENTICATION_SCHEME")]
        [ServiceFilter(typeof(OrderAuthorizationMiddleware))]
        [HttpGet("{orderId}")]
        public async Task<ActionResult> Get([FromRoute] string orderId)
        {
            // check order of user
            var query = new GetOrder(Guid.Parse(orderId));

            var result = await _queryDispatcher.DispatchAsync(query);

            return Ok(result);
        }
    }
}
