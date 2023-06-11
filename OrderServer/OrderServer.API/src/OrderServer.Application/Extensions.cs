using Microsoft.Extensions.DependencyInjection;
using OrderServer.Domain.Factories;
using OrderServer.Shared.Dispatcher.Commands;
using OrderServer.Shared.Dispatcher.Events;
using OrderServer.Shared.Dispatcher.Queries;
using System.Reflection;

namespace OrderServer.Application
{
    public static class Extensions
    {
        public static IServiceCollection AddApplicationLayer(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddCommands();
            services.AddQueries();
            services.AddEvents();
            services.AddSingleton<IUserFactory, UserFactory>();
            services.AddSingleton<IOrderFactory, OrderFactory>();   
            return services;
        }
    }
}
