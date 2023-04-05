namespace AuthServer.API.Dto.User;

public class UserForgotDto
{
    public string? Username { get; set; }
    public string? OldPassword { get; set; }
    public string? NewPassword { get; set; }
}