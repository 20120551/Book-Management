using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Write.Options
{
    public class PostgresOptions
    {
        public string ConnectionString { get; set; } = null!;
    }
}
