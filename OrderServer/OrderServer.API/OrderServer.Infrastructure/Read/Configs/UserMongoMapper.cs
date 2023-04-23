using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using OrderServer.Infrastructure.Read.Contexts;
using OrderServer.Infrastructure.Read.Serializer;

namespace OrderServer.Infrastructure.Read.Configs
{
    public class UserMongoMapper : IMongoMapper
    {
        public void Register()
        {
            BsonClassMap.RegisterClassMap<User>(cm =>
            {
                cm.AutoMap();
                cm.GetMemberMap(c => c.Id).SetElementName("Id");
                cm.MapProperty(c => c.Username);
                cm.MapField("_firstName").SetElementName("FirstName");
                cm.MapField("_lastName").SetElementName("LastName");
                cm.MapProperty(c => c.Orders)
                    .SetSerializer(new OrderSerializer());
                // ignore mostly field on order except id
            });
        }
    }
}
