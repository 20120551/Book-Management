namespace AuthServer.API.Dto.Jwk;

public class JwkReadDto
{
    public string kid { get; set; } = null!;
    public string kty { get; set; } = null!;
    public string alg { get; set; } = null!;
    public string e { get; set; } = null!;
    public string n { get; set; } = null!;
}