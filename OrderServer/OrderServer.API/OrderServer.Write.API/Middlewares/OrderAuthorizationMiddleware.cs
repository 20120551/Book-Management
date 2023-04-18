using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OrderServer.Domain.Repositories;
using System.Security.Claims;

namespace OrderServer.Read.API.Middlewares
{
    public class OrderAuthorizationMiddleware : IAsyncActionFilter
    {
        private readonly IUserRepo _userRepo;
        public OrderAuthorizationMiddleware(
            IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            context.ActionArguments.TryGetValue("orderId", out var orderParams);
            var orderId = orderParams as string;

            // check order on user
            var userId = context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)!;

            // get user
            var user = await _userRepo.GetAsync(new Guid(userId));

            // check order in user
            if(user is null)
            {
                // return 401
                context.Result = new UnauthorizedResult();
                return;
            }

            var order = user?.GetOrder(new Guid(orderId!));
            if(order is null)
            {
                // return 403
                context.Result = new UnauthorizedResult();
                return;
            }
            await next();
        }
    }
}
