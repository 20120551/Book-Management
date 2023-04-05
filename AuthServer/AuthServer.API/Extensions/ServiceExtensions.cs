using AuthServer.API.Configurations;
using AuthServer.API.Models;
using AuthServer.API.Publisher.Interfaces;
using AuthServer.API.Publisher.Services;
using AuthServer.API.Subscribers.Interfaces;
using AuthServer.API.Subscribers.Services;
using MongoDB.Driver;
using StackExchange.Redis;

namespace AuthServer.API.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddRedis(this IServiceCollection services, IConfiguration configuration)
    {
        //binding section to options
        var section = configuration.GetSection("RedisServer");
        var options = new RedisConfig();
        section.Bind(options);

        //connect to redis
        services.Configure<RedisConfig>(section);
        var redis = ConnectionMultiplexer.Connect(options.ConnectionString);

        //add singleton
        services.AddSingleton<IConnectionMultiplexer>(redis);
        return services;
    }

    public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration configuration)
    {
        //binding sections to options
        var section = configuration.GetSection("MongoServer");
        var options = new MongoConfig();
        section.Bind(options);

        //connect to mongo
        services.Configure<MongoConfig>(section);
        var mongoClient = new MongoClient(options.ConnectionString);
        var mongoDb = mongoClient.GetDatabase(options.DatabaseName);

        services.AddSingleton<IMongoCollection<PrivateKeyStore>>(
            mongoDb.GetCollection<PrivateKeyStore>(options.CollectionName["PrivKey"]));

        services.AddSingleton<IMongoCollection<PublicKeyStore>>(
            mongoDb.GetCollection<PublicKeyStore>(options.CollectionName["PubKey"]));
        return services;
    }

    public static IServiceCollection AddStreamingService(this IServiceCollection services)
    {
        services.AddSingleton<IStreamingSubscriber, StreamingSubscriber>();
        services.AddSingleton<IStreamingPublisher, StreamingPublisher>();
        return services;
    }
}