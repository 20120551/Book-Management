using Microsoft.AspNetCore.Mvc;
using OrderServer.Shared.Dispatcher.Commands;

namespace OrderServer.Read.API.Controllers
{
    [Route("api/[controllers]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ICommandDispatcher _commandDispatcher;
        public OrderController(
            ICommandDispatcher commandDispatcher)
        {
            _commandDispatcher = commandDispatcher;
        }
    }
}
