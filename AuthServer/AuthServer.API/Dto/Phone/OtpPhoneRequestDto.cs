using AuthServer.API.Dto.Phone.Shared;

namespace AuthServer.API.Dto.Phone;

public class OtpPhoneRequestDto : PhoneRequest
{
    public string OTP { get; set; } = null!;
}