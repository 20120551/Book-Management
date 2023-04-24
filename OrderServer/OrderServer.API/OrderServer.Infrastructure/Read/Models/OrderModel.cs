using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read.Models
{
    public class OrderModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.Binary)]
        public Guid Id { get; set; }
        [BsonElement]
        public float TotalPrice { get; set; }
        [BsonElement]
        public string State { get; set; } = null!;
        [BsonElement]
        public Receiver Receiver { get; set; } = null!;
        [BsonElement]
        public ICollection<MovieItem> Movies { get; set; } = new List<MovieItem>();
    }
}
