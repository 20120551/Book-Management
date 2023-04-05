namespace AuthServer.API.Configurations;

public class MongoConfig
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public Dictionary<string, string> CollectionName { get; set; } = null!;
}