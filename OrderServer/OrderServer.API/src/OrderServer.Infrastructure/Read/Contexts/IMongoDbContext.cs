using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read.Contexts
{
    public interface IMongoDbContext
    {
        Task ConfigureMapperAsync();
    }
}
