using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read.Serializer
{
    public class MovieItemSerializer : SerializerBase<MovieItem>
    {
        public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, MovieItem value)
        {
            var doc = new BsonDocument();
            doc.Add("_id", value.Id.ToString());
            doc.Add("Name", value.Name);
            doc.Add("Seat", value.Seat);
            doc.Add("Quantity", value.Quantity);
            doc.Add("Price", value.Price);

            var writer = context.Writer;    
            writer.WriteStartDocument();

            BsonSerializer.Serialize(writer, doc);

            writer.WriteEndDocument();
        }

        public override MovieItem Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            return base.Deserialize(context, args);
        }
    }
}
