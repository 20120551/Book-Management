using AuthServer.API.Dto.Email;

namespace AuthServer.API.Business.Interfaces;

public interface IMailService
{
    Task SendActivatedAccountEmailAsync(ActivatedAccountRequestDto emailRequest);
    Task SendForgotPasswordEmailAsync(ActivatedAccountRequestDto emailRequest);
}