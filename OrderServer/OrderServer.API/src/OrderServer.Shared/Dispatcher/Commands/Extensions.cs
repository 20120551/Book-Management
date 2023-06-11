using Microsoft.Extensions.DependencyInjection;
using OrderServer.Shared.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Dispatcher.Commands
{
    public static class Extensions
    {
        public static IServiceCollection AddCommands(this IServiceCollection services)
        {
            // add dispatcher
            services.AddSingleton<ICommandDispatcher, CommandDispatcher>();
            // get assembly
            var essembly = Assembly.GetCallingAssembly();
            // scan service
            services.Scan(s => s.FromAssemblies(essembly)
                .AddClasses(c => c.AssignableTo(typeof(ICommandHandler<>)))
                .AsImplementedInterfaces()
                .WithScopedLifetime()
            );

            return services;
        }
    }
}
