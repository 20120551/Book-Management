using OrderServer.Shared.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Dispatcher.Queries
{
    public interface IQueryDispatcher
    {
        Task<TResult> DispatchAsync<TResult>(IQuery<TResult> query) where TResult : class;
    }
}
