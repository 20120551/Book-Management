using AuthServer.API.Business.Interfaces;
using AuthServer.API.Configurations;
using AuthServer.API.Dto.Email;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace AuthServer.API.Business.Services;

public class MailService : IMailService
{
    private readonly MailConfig _emailSettings;

    public MailService(IOptions<MailConfig> emailSettings)
    {
        _emailSettings = emailSettings.Value;
    }
    public async Task SendActivatedAccountEmailAsync(ActivatedAccountRequestDto emailRequest)
    {
        // read template mail
        string path = "wwwroot/Templates/ActivatedAccountTemplate.html";
        string mailText;
        using (var streamReader = new StreamReader(path))
        {
            mailText = await streamReader.ReadToEndAsync();
        }

        // generate tempate email
        var subject = $"Welcome {emailRequest.Username}";
        mailText = mailText.Replace("[TITLE]", subject)
            .Replace("[OTP]", emailRequest.OTP);

        // create mail header
        var email = new MimeMessage();
        email.Sender = MailboxAddress.Parse(_emailSettings.Mail);
        email.To.Add(MailboxAddress.Parse(emailRequest.To));
        email.Subject = subject;

        // create mail body
        var builder = new BodyBuilder();
        builder.HtmlBody = mailText;
        email.Body = builder.ToMessageBody();

        // sending mail with smtp
        using (var smtp = new SmtpClient())
        {
            await smtp.ConnectAsync(_emailSettings.Host, _emailSettings.Port, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailSettings.Mail, _emailSettings.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }

    public async Task SendForgotPasswordEmailAsync(ActivatedAccountRequestDto emailRequest)
    {
        // read template mail
        string path = "wwwroot/Templates/ForgotPasswordTemplate.html";
        string mailText;
        using (var streamReader = new StreamReader(path))
        {
            mailText = await streamReader.ReadToEndAsync();
        }

        // generate tempate email
        var subject = $"Welcome {emailRequest.Username}";
        mailText = mailText
            .Replace("[OTP]", emailRequest.OTP);

        // create mail header
        var email = new MimeMessage();
        email.Sender = MailboxAddress.Parse(_emailSettings.Mail);
        email.To.Add(MailboxAddress.Parse(emailRequest.To));
        email.Subject = subject;

        // create mail body
        var builder = new BodyBuilder();
        builder.HtmlBody = mailText;
        email.Body = builder.ToMessageBody();

        // sending mail with smtp
        using (var smtp = new SmtpClient())
        {
            await smtp.ConnectAsync(_emailSettings.Host, _emailSettings.Port, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailSettings.Mail, _emailSettings.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}