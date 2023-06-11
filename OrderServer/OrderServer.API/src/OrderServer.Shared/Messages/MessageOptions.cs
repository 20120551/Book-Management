using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Messages
{
    public class MessageOptions
    {
        public string HostName { get; set; } = null!;
        public int Port { get; set; }
    }
}
