using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using OrderServer.Shared.Exceptions;

namespace OrderServer.Shared.Middleware
{
    internal sealed class ExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (OrderException ex)
            {
                context.Response.StatusCode = 400;
                context.Response.Headers.Add("content-type", "application/json");

                var errorCode = ToUnderscoreCase(ex.GetType().Name.Replace("Exception", string.Empty));
                var json = JsonConvert.SerializeObject(new { ErrorCode = errorCode, ex.Message });
                await context.Response.WriteAsync(json);
            }
        }

        public static string ToUnderscoreCase(string value)
            => string.Concat((value ?? string.Empty).Select((x, i) => i > 0 && char.IsUpper(x) && !char.IsUpper(value[i - 1]) ? $"_{x}" : x.ToString())).ToLower();
    }
}
