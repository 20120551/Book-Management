using OrderServer.Shared.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Dispatcher.Commands
{
    public class CommandDispatcher : ICommandDispatcher
    {
        public Task DispatchAsync<TCommand>(TCommand command) where TCommand : ICommand
        {
            // get service 
            // handle async
            throw new NotImplementedException();
        }
    }
}
