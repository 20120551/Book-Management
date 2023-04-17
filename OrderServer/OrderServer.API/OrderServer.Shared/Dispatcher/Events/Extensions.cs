using Microsoft.Extensions.DependencyInjection;
using OrderServer.Shared.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Dispatcher.Events
{
    public static class Extensions
    {
        public static IServiceCollection AddEvents(this IServiceCollection services)
        {
            // get assembly
            var assembly = Assembly.GetCallingAssembly();
            // scan service
            services.Scan(s => s.FromAssemblies(assembly)
                .AddClasses(c => c.AssignableTo(typeof(IEventHandler<>)))
                .AsImplementedInterfaces()
                .WithScopedLifetime()
            );
            // add dispatcher
            services.AddSingleton<IEventDispatcher, EventDispatcher>();
            return services;
        }
    }
}
