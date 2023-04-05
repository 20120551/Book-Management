using AuthServer.API.Business.Interfaces;
using AuthServer.API.Constants;
using AuthServer.API.Dto.Email;
using AuthServer.API.Dto.Phone;
using AuthServer.API.Subscribers.Interfaces;

namespace AuthServer.API.Subscribers.Background;

public class StreamingBackgroundService : BackgroundService
{
    private readonly IStreamingSubscriber _streamingSubscriber;
    private readonly IServiceProvider _serviceProvider;

    public StreamingBackgroundService(
        IStreamingSubscriber streamingSubscriber,
        IServiceProvider serviceProvider)
    {
        _streamingSubscriber = streamingSubscriber;
        _serviceProvider = serviceProvider;
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Console.Out.WriteLine("---> logging from Email streaming services");
        IMailService emailService;
        ISMSService smsService;
        using (var scope = _serviceProvider.CreateScope())
        {
            emailService = scope.ServiceProvider.GetService<IMailService>()!;
            smsService = scope.ServiceProvider.GetService<ISMSService>()!;
        }


        await _streamingSubscriber.SubscribeAsync<ActivatedAccountRequestDto>(
            StreamingChannelConstants.ACTIVATED_ACCOUNT_CHANNEL, async (payload) =>
        {
            await emailService.SendActivatedAccountEmailAsync(payload);
        });

        await _streamingSubscriber.SubscribeAsync<ActivatedAccountRequestDto>(
            StreamingChannelConstants.FORGOT_PASSWORD_CHANNEL, async (payload) =>
        {
            await emailService.SendForgotPasswordEmailAsync(payload);
        });

        await _streamingSubscriber.SubscribeAsync<OtpPhoneRequestDto>(
            StreamingChannelConstants.ACTIVATED_PHONE_CHANNEL, async (payload) =>
        {
            await smsService.SendSMSAsync(payload);
        });


        Console.Out.WriteLine("---> sending Email streaming services successfully");
    }
}