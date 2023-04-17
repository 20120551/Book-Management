namespace OrderServer.Shared.Cache
{
    public class CacheOptions
    {
        public string ConnectionStrings { get; set; } = null!;
        public bool AbortOnConnectFail { get; set; }
    }
}
