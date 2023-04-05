using AuthServer.API.Dto.Email.Shared;
namespace AuthServer.API.Dto.Email;

public class ActivatedAccountRequestDto : EmailRequest
{
    public string OTP { get; set; } = null!;
    public string Username { get; set; } = null!;
}