using AuthServer.API.Dto.Phone;

namespace AuthServer.API.Business.Interfaces;

public interface ISMSService
{
    Task SendSMSAsync(OtpPhoneRequestDto phoneRequest);
}