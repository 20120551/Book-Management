using Jose;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AuthServer.API.Models;

public class PublicKeyStore
{
    [BsonId]
    public ObjectId _id { get; set; }
    public Jwk jwk { get; set; } = null!;

}