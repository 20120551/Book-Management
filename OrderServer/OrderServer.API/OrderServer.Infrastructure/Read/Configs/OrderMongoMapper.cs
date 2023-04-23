using MongoDB.Bson.Serialization;
using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using OrderServer.Infrastructure.Read.Serializer;

namespace OrderServer.Infrastructure.Read.Configs
{
    public class OrderMongoMapper : IMongoMapper
    {
        // remove orderId inside each movie item
        // remove all of information relevent to order inside user table
        public void Register()
        {
            BsonClassMap.RegisterClassMap<Order>(cm =>
            {
                cm.AutoMap();
                cm.MapProperty(c => c.Id).SetElementName("Id");
                cm.MapField("_state").SetElementName("State");
                cm.MapField("_receiver").SetElementName("Receiver");
                cm.MapField("_totalPrice").SetElementName("TotalPrice");
                cm.MapField("_movies")
                    .SetElementName("Items");
                cm.MapProperty(c => c.User).SetIgnoreIfDefault(true);
                cm.MapProperty(c => c.UserId).SetIgnoreIfDefault(true);
            });
        }
    }
}
