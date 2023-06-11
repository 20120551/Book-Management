using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Queries
{
    public interface IQueryHandler<TQuery, TResult> 
        where TResult: class
        where TQuery : IQuery<TResult>
    {
        Task<TResult> QueryAsync(TQuery query);
    }
}
