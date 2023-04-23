using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using OrderServer.Domain.Entities;

namespace OrderServer.Infrastructure.Read.Serializer
{
    public class OrderSerializer : SerializerBase<ICollection<Order>>
    {
        public override ICollection<Order> Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            return new List<Order>();
        }

        public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, ICollection<Order> value)
        {
            var writer = context.Writer;

            writer.WriteStartArray();

            foreach (var item in value)
            {
                writer.WriteObjectId(new ObjectId(item.Id.ToString()));
            }

            writer.WriteEndArray();
        }
    }
}
