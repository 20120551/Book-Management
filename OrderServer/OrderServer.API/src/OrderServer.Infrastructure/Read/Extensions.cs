using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using OrderServer.Domain.Entities;
using OrderServer.Domain.Enums;
using OrderServer.Domain.Factories;
using OrderServer.Domain.Repositories;
using OrderServer.Infrastructure.Read.Configs;
using OrderServer.Infrastructure.Read.Contexts;
using OrderServer.Infrastructure.Read.Models;
using OrderServer.Infrastructure.Read.Options;
using OrderServer.Infrastructure.Read.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read
{
    public static class Extensions
    {
        public static IServiceCollection AddReadSide(this IServiceCollection services)
        {
            // get configuration
            using var serviceProvider = services.BuildServiceProvider();
            var configuration = serviceProvider.GetService<IConfiguration>()!;

            // binding options
            var section = configuration.GetSection("Mongo");
            var options = new MongoOptions();
            section.Bind(options);

            // get connection
            var mongoClient = new MongoClient(options.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(options.Database);


            // add mongo Config
            services.AddMongoConfigMap();

            // inject
            services.AddSingleton<IMongoDatabase>(mongoDatabase);
            services.AddSingleton<IOrderRepo, OrderRepo>();
            services.AddSingleton<IUserRepo, UserRepo>();


            return services;
        }

        public static IServiceCollection AddMongoConfigMap(this IServiceCollection services)
        {
            // add appDbContext
            services.AddSingleton<IMongoDbContext, AppDbContext>();

            // scan and add IMongoMapper
            var assembly = Assembly.GetCallingAssembly();
            services.Scan(s => s.FromAssemblies(assembly)
               .AddClasses(c => c.AssignableTo(typeof(IMongoMapper)))
               .AsImplementedInterfaces()
               .WithScopedLifetime()
           );

            return services;
        }

        public static OrderModel AsDto(this Order order)
        {
            return new OrderModel { 
                Id = order.Id, State = order._state, 
                TotalPrice = order._totalPrice, 
                Movies = order._movies,
                Receiver = order._receiver };
        }
        public static Order AsDto(this OrderModel orderModel, IOrderFactory factory)
        {
            var order = factory.Create(orderModel.Id, orderModel.Receiver);
            var state = Enum.Parse<StateEnum>(orderModel.State);
            order.ChangeState(state);
            order.AddMovies(orderModel.Movies);
            return order;
        }

        public static UserModel AsDto(this User user)
        {
            var orders = user.Orders.Select(o => o.Id.Id).ToList();
            return new UserModel
            {
                Id = user.Id,
                Username = user.Username,
                OrderIds = orders
            };
        }

        public static User AsDto(this UserModel user, IUserFactory userFactory, IOrderFactory orderFactory)
        {
            var _user = userFactory.Create(user.Id, user.Username, "", "");
            
            foreach(var o in user.Orders)
            {
                var order = o.AsDto(orderFactory);
                _user.AddOrder(order);
            }
            return _user;
        }
    }
}
