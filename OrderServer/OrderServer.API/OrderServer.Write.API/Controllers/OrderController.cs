using Microsoft.AspNetCore.Mvc;
using OrderServer.Application.Commands;
using OrderServer.Shared.Dispatcher.Commands;
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
        [HttpPost]
        public async Task<IActionResult> Create()
        {
            // get cart Id
            var cartId = Request.Cookies["cart_id"] ?? "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";

            var command = new CreateOrder(
                new Guid(cartId), Guid.NewGuid(), new Guid(userId));

            await _commandDispatcher.DispatchAsync(command);

            return Ok();
        }
    }
}
