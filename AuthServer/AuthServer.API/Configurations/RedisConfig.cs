namespace AuthServer.API.Configurations;

public class RedisConfig
{
    public string ConnectionString { get; set; } = null!;
    public bool AbortOnConnectFail { get; set; }
}