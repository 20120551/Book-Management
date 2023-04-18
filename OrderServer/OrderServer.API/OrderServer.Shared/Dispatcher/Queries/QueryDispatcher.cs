using Microsoft.Extensions.DependencyInjection;
using OrderServer.Shared.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Dispatcher.Queries
{
    public class QueryDispatcher : IQueryDispatcher
    {
        private readonly IServiceProvider _serviceProvider;
        public QueryDispatcher(
            IServiceProvider serviceProvider)
        {
            _serviceProvider= serviceProvider;
        }
        public Task<TResult> DispatchAsync<TResult>(IQuery<TResult> query) where TResult : class
        {
            using var scope = _serviceProvider.CreateScope();
            // make type
            var handlerType = typeof(IQueryHandler<,>).MakeGenericType(query.GetType(), typeof(TResult));
            var handler = scope.ServiceProvider.GetService(handlerType);

            // get method
            var handleAsyncMethod = handlerType.GetMethod(nameof(IQueryHandler<IQuery<TResult>,TResult>.QueryAsync))!;

            return (Task<TResult>)handleAsyncMethod.Invoke(handler, new object[] { query })!;
        }
    }
}
