using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Shared.Messages
{
    public static class Extensions
    {
        public static IServiceCollection AddRabbitMq(this IServiceCollection services)
        {
            // get configuration
            IConfiguration configuration;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                configuration = serviceProvider.GetService<IConfiguration>()!;
            
            }

            //binding section
            var section = configuration.GetSection("RabbitMq");
            var options = new MessageOptions();
            section.Bind(options);

            // create connection
            var factory = new ConnectionFactory()
            {
                HostName = options.HostName,
                Port = options.Port
            };

            var rabbitMq = factory.CreateConnection();

            // add service
            services.AddSingleton<IConnection>(rabbitMq);
            services.AddSingleton<IPublisher, Publisher>();
            services.AddSingleton<ISubscriber, Subscriber>();

            return services;
        }
    }
}
