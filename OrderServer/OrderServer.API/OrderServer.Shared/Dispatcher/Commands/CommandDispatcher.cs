using Microsoft.Extensions.DependencyInjection;
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
        private readonly IServiceProvider _serviceProvider;
        public CommandDispatcher(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        public Task DispatchAsync<TCommand>(TCommand command) where TCommand : ICommand
        {
            // get service 
            using var scope = _serviceProvider.CreateScope();
            var handler = scope.ServiceProvider.GetService<ICommandHandler<TCommand>>()!;
            // handle async
            return handler.HandleAsync(command);
        }
    }
}
