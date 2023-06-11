using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using OrderServer.Infrastructure.Read.Contexts;
using OrderServer.Infrastructure.Read.Models;

namespace OrderServer.Infrastructure.Read.Configs
{
    public class UserMongoMapper : IMongoMapper
    {
        public void Register()
        {
            BsonClassMap.RegisterClassMap<UserModel>(cm =>
            {
                cm.AutoMap();
                cm.GetMemberMap(c => c.Id).SetElementName("Id");
                cm.MapProperty(c => c.Username);
                cm.MapProperty(c => c.Orders);
                    //.SetSerializer(new OrderSerializer());
                // ignore mostly field on order except id
            });
        }
    }
}
