using AuthServer.API.Business.Interfaces;
using AuthServer.API.Configurations;
using AuthServer.API.Dto.Phone;
using Microsoft.Extensions.Options;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

public class SMSService : ISMSService
{
    private readonly PhoneConfig _phoneSettings;

    public SMSService(IOptions<PhoneConfig> phoneSettings)
    {
        _phoneSettings = phoneSettings.Value;
    }
    public async Task SendSMSAsync(OtpPhoneRequestDto phoneRequest)
    {
        string accountSid = _phoneSettings.AccountSid;
        string authToken = _phoneSettings.AuthToken;

        TwilioClient.Init(accountSid, authToken);

        var phoneFormater = phoneRequest.To.Substring(1, phoneRequest.To.Length - 1);
        var to = $"+84{phoneFormater}";
        var message = await MessageResource.CreateAsync(
            body: $"Your phone OTP is: {phoneRequest.OTP}. Note that, this OTP just valid on 2 minutes",
            from: new Twilio.Types.PhoneNumber(_phoneSettings.Sender),
            to: new Twilio.Types.PhoneNumber(to)
        );
    }
}