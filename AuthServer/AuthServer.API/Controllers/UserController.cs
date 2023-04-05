using System.Security.Claims;
using AuthServer.API.Business.Interfaces;
using AuthServer.API.Constants;
using AuthServer.API.Dto.Phone;
using AuthServer.API.Dto.User;
using AuthServer.API.Extensions;
using AuthServer.API.Publisher.Interfaces;
using AuthServer.API.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AuthServer.API.Controller;


[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IStreamingPublisher _streamingPublisher;
    private readonly ICacheService _cacheService;

    public UserController(
        IUserService userService,
        IStreamingPublisher streamingPublisher,
        ICacheService cacheService)
    {
        _userService = userService;
        _streamingPublisher = streamingPublisher;
        _cacheService = cacheService;
    }

    [HttpGet]
    [Authorize(AuthenticationSchemes = "JWT_AUTHENTICATION_SCHEME")]
    // [Authorize(Roles = "mod")]
    // [Authorize(Policy = "test")]
    public async Task<ActionResult<UserReadDto>> Get()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userService.Get(userId!);
        return Ok(user);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = "JWT_AUTHENTICATION_SCHEME")]
    public async Task<ActionResult<UserReadDto>> Update([FromBody] UserUpdateDto userRequest)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userService.Update(userRequest, userId!);
        return Ok(user);
    }

    [HttpPost("phone")]
    [Authorize(AuthenticationSchemes = "JWT_AUTHENTICATION_SCHEME")]
    public async Task<ActionResult<UserReadDto>> AddPhoneNumber([FromBody] UserPhoneDto userRequest)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userService.AddPhoneNumber(userRequest, userId!);

        var OTP = RandomString.GenerateOTP(4);
        var phoneRequest = new OtpPhoneRequestDto()
        {
            //replace: user.PhoneNumber
            To = "0395244112",
            OTP = OTP
        };

        await _streamingPublisher.PublishAsync(StreamingChannelConstants.ACTIVATED_PHONE_CHANNEL, phoneRequest);
        //gen protect otp
        var protectOtp = RandomString.GenerateOTP(4);
        Response.HttpContext.Session.SetString("protect_otp", protectOtp);

        //store otp to cache
        var expirationTime = DateTime.Now.AddMinutes(2);
        await _cacheService.SetData($"{userId}_{protectOtp}", OTP, expirationTime);

        return Ok(user);
    }

    [HttpPost("phone/verify")]
    [Authorize(AuthenticationSchemes = "JWT_AUTHENTICATION_SCHEME")]
    public async Task<ActionResult<UserReadDto>> VerifyPhoneOtp([FromBody] UserActivatedDto userRequest)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var protectOtp = Request.HttpContext.Session.GetString("protect_otp");

        var otp = await _cacheService.GetData<string>($"{userId}_{protectOtp}");

        var user = await _userService.VerifyPhoneOtp(userRequest, otp, userId!);

        //clear cache and session
        await _cacheService.RemoveData($"{userId}_{protectOtp}");
        Response.HttpContext.Session.Remove("protect_otp");
        return Ok(user);
    }

    [HttpPut("phone/resend")]
    [Authorize(AuthenticationSchemes = "JWT_AUTHENTICATION_SCHEME")]
    public async Task<ActionResult<UserReadDto>> ResendOtp()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var oldProtectOtp = Request.HttpContext.Session.GetString("protect_otp");
        var user = await _userService.Get(userId!);

        //clear cache and protect otp
        await _cacheService.RemoveData($"{userId}_{oldProtectOtp}");

        var OTP = RandomString.GenerateOTP(4);
        var phoneRequest = new OtpPhoneRequestDto()
        {
            //replace: user.PhoneNumber
            To = "0395244112",
            OTP = OTP
        };

        await _streamingPublisher.PublishAsync(StreamingChannelConstants.ACTIVATED_PHONE_CHANNEL, phoneRequest);
        //gen protect otp
        var protectOtp = RandomString.GenerateOTP(4);
        Response.HttpContext.Session.SetString("protect_otp", protectOtp);

        //store otp to cache
        var expirationTime = DateTime.Now.AddMinutes(2);
        await _cacheService.SetData($"{userId}_{protectOtp}", OTP, expirationTime);

        return NoContent();
    }

    [HttpPut("refresh-token")]
    [Authorize(AuthenticationSchemes = "JWT_AUTHENTICATION_SCHEME")]
    public async Task<ActionResult<object>> RefreshToken()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var refreshToken = await _cacheService.GetData<string>($"{userId}_refresh_token");
        var (token, user) = await _userService.RefreshToken(userId!, refreshToken!);

        //store refreshtoken in redis
        var expirationTime = DateTime.Now.AddHours(1);
        await _cacheService.SetData($"{userId}_refresh_token", token.RefreshToken, expirationTime);

        return Ok(new { AccessToken = token.AccessToken, User = user });
    }

    [HttpPut("change-password")]
    [Authorize(AuthenticationSchemes = "JWT_AUTHENTICATION_SCHEME")]
    public async Task<ActionResult> ChangePassword([FromBody] UserForgotDto userRequest)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        await _userService.ChangePassword(userRequest, userId!);
        return NoContent();
    }
}