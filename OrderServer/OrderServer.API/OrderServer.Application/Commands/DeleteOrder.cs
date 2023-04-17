using OrderServer.Shared.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Commands
{
    public record DeleteOrder(Guid OrderId) : ICommand;
}
