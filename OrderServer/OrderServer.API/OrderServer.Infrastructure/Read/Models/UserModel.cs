using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read.Models
{
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.Binary)]
        public Guid Id { get; set; }
        [BsonElement]
        public string Username { get; set; } = null!;
        [BsonRepresentation(BsonType.Binary)]
        public ICollection<Guid> OrderIds { get; set; } = new List<Guid>();
        [BsonElement]
        public ICollection<OrderModel> Orders { get; set; } = new List<OrderModel>();
    }
}
