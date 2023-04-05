namespace AuthServer.API.Utils;

static public class RandomString
{
    public static string GenerateIdWithPrefix(string prefix)
    {
        var guid = Guid.NewGuid().ToString().Split('-')[0];
        return $"{prefix}{guid}";
    }
    public static string GenerateOTP(int len)
    {
        var rnd = new Random();
        var result = rnd.NextInt64((long)Math.Pow(10, len), (long)Math.Pow(10, len + 1) - 1);
        return result.ToString();
    }
}