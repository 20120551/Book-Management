using System.Net;
using AuthServer.API.Exceptions.Abstraction;

namespace AuthServer.API.Middlewares;

public class ExceptionHandlingMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (DomainException e)
        {
            var status = e.GetHttpStatusCode();
            context.Response.StatusCode = (int)status;
            await context.Response.WriteAsJsonAsync(new
            {
                Message = e.Message
            });
        }
        catch (Exception e)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await context.Response.WriteAsJsonAsync(new
            {
                Message = e.Message
            });
        }
    }
}