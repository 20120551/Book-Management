namespace AuthServer.API.Dto.Email.Shared;

public class EmailRequest
{
    public string To { get; set; } = null!;
    public string Subject { get; set; } = null!;
}