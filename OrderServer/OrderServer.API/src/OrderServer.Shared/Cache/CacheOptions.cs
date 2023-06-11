namespace OrderServer.Shared.Cache
{
    public class CacheOptions
    {
        public string ConnectionString { get; set; } = null!;
        public bool AbortOnConnectFail { get; set; } = false;
    }
}
