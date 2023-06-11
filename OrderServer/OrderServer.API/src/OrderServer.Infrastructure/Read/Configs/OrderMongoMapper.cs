using MongoDB.Bson.Serialization;
using OrderServer.Domain.Entities;
using OrderServer.Infrastructure.Read.Models;

namespace OrderServer.Infrastructure.Read.Configs
{
    public class OrderMongoMapper : IMongoMapper
    {
        // remove orderId inside each movie item
        // remove all of information relevent to order inside user table
        public void Register()
        {
            BsonClassMap.RegisterClassMap<OrderModel>(cm =>
            {
                cm.AutoMap();
                cm.MapProperty(c => c.Id).SetElementName("Id");
                cm.MapProperty(c => c.State);
                cm.MapProperty(c => c.TotalPrice);
                cm.MapProperty(c => c.Receiver);
                cm.MapProperty(c => c.Movies);
            });
        }
    }
}
