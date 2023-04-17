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
        public Task<TResult> DispatchAsync<TResult>(IQuery<TResult> query) where TResult : IQuery
        {
            using var scope = _serviceProvider.CreateScope();
            var handler = scope.ServiceProvider.GetService<IQueryHandler<IQuery<TResult>, TResult>>()!;
            return handler.QueryAsync(query);
        }
    }
}
