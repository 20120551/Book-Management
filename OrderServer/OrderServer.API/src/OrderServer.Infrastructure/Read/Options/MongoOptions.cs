using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read.Options
{
    public class MongoOptions
    {
        public string ConnectionString { get; set; } = null!;
        public string Database { get; set; } = null!;
    }
}
