using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderServer.Application.Commands;
using OrderServer.Read.API.Middlewares;
using OrderServer.Shared.Dispatcher.Commands;
using OrderServer.Write.API.DTO;
using System.Security.Claims;

namespace OrderServer.Write.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        public OrderController(
            ICommandDispatcher commandDispatcher)
        {
            _commandDispatcher = commandDispatcher;
        }

        // authentication
        [Authorize(AuthenticationSchemes = "KONG_AUTHENTICATION_SCHEME")]
        [HttpPost]
        public async Task<ActionResult> Create()
        {
            // get cart Id
            var cartId = Request.Cookies["cart_id"] ?? "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";

            var command = new CreateOrder(
                new Guid(cartId), Guid.NewGuid(), new Guid(userId));

            await _commandDispatcher.DispatchAsync(command);

            return Ok(new {Message = "Create success", Redirect_link = "http://localhost:5003/api/order"});
        }

        // authentication
        [Authorize(AuthenticationSchemes = "KONG_AUTHENTICATION_SCHEME")]
        [ServiceFilter(typeof(OrderAuthorizationMiddleware))]
        [HttpPost("{orderId}")]
        public async Task<IActionResult> Update([FromRoute]string orderId, [FromBody] OrderUpdatedRequest request)
        {
            // check order of user
            var command = new UpdateOrder(new Guid(orderId), request.State);

            await _commandDispatcher.DispatchAsync(command);

            return NoContent();
        }

        // authentication
        [Authorize(AuthenticationSchemes = "KONG_AUTHENTICATION_SCHEME")]
        [ServiceFilter(typeof(OrderAuthorizationMiddleware))]
        [HttpPut("{orderId}")]
        public async Task<IActionResult> Delete([FromRoute] string orderId)
        {
            // check order of user
            var command = new DeleteOrder(new Guid(orderId));

            await _commandDispatcher.DispatchAsync(command);

            return NoContent();
        }
    }
}
