using System.Text;
using AuthServer.API.Business.Interfaces;
using AuthServer.API.Constants;
using AuthServer.API.Dto.Email;
using AuthServer.API.Dto.Token;
using AuthServer.API.Dto.User;
using AuthServer.API.Extensions;
using AuthServer.API.Publisher.Interfaces;
using AuthServer.API.Utils;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.API.Controller;

[ApiController]
[Route("api/[Controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IStreamingPublisher _streamingPublisher;
    private readonly ICacheService _cacheService;

    public AuthController(
        IUserService userService,
        IStreamingPublisher streamingPublisher,
        ICacheService cacheService)
    {
        _userService = userService;
        _streamingPublisher = streamingPublisher;
        _cacheService = cacheService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserReadDto>> Register([FromBody] UserCreateDto userRequest)
    {
        var user = await _userService.Register(userRequest);

        var OTP = RandomString.GenerateOTP(4);
        var mailRequest = new ActivatedAccountRequestDto()
        {
            //replace: user.Username
            To = "killermh1352@gmail.com",
            Subject = "Activate Account",
            OTP = OTP,
            Username = $"{user.Firstname} {user.Lastname}"
        };

        var mailType = StreamingChannelConstants.ACTIVATED_ACCOUNT_CHANNEL;
        //sending mail
        await _streamingPublisher.PublishAsync(mailType, mailRequest);

        var protectOtp = RandomString.GenerateOTP(4);
        //store userId to session
        Response.HttpContext.Session.SetString("otp_tracking", $"{user.Id}-{protectOtp}");
        Response.HttpContext.Session.SetString("type", mailType);

        //cache otp 
        var expirationTime = DateTime.Now.AddMinutes(2);
        await _cacheService.SetData($"{user.Id}_{protectOtp}", OTP, expirationTime);

        return Ok(user);
    }
    [HttpPost("activate")]
    public async Task<ActionResult<UserReadDto>> Activate([FromBody] UserActivatedDto userRequest)
    {
        var session = Request.HttpContext.Session.GetString("otp_tracking") ?? "-";
        var (userId, protectOtp, rest) = session.Split("-");

        var otp = await _cacheService.GetData<string>($"{userId}_{protectOtp}");

        var UserResponse = await _userService.Activate(userRequest, otp, userId!);

        // clear cache
        await _cacheService.RemoveData($"{userId}_{protectOtp}");

        // remove session
        Response.HttpContext.Session.Remove("otp_tracking");
        Response.HttpContext.Session.Remove("type");

        return Ok(UserResponse);

    }
    [HttpPut("resend-email")]
    public async Task<ActionResult> ResendEmail()
    {
        //get user, if not found then return bad request
        var session = Request.HttpContext.Session.GetString("otp_tracking") ?? "-";
        var mailType = Request.HttpContext.Session.GetString("type");

        var (userId, protectOtp, rest) = session.Split("-");

        var user = await _userService.Get(userId!);

        // clear old cache
        await _cacheService.RemoveData($"{userId}_{protectOtp}");

        //if found, generate otp, send to email
        var OTP = RandomString.GenerateOTP(4);
        var mailRequest = new ActivatedAccountRequestDto()
        {
            //replace: user.Username
            To = "killermh1352@gmail.com",
            Subject = "Resend OTP",
            OTP = OTP,
            Username = $"{user.Firstname} {user.Lastname}"
        };

        //sending mail
        await _streamingPublisher.PublishAsync(mailType ?? "", mailRequest);


        //store userId to session
        var _protectOtp = RandomString.GenerateOTP(4);

        Response.HttpContext.Session.SetString("otp_tracking", $"{user.Id}-{_protectOtp}");
        Response.HttpContext.Session.SetString("type", mailType!);

        //cache otp 
        var expirationTime = DateTime.Now.AddMinutes(2);
        await _cacheService.SetData($"{user.Id}_{_protectOtp}", OTP, expirationTime);

        return NoContent();
    }
    [HttpPost("Forgot")]
    public async Task<ActionResult> ForgotPassword([FromBody] UserForgotDto userRequest)
    {
        var user = await _userService.GetByUsername(userRequest.Username ?? "");
        //if found, generate otp, send to email
        var OTP = RandomString.GenerateOTP(4);
        var mailRequest = new ActivatedAccountRequestDto()
        {
            //replace: user.Username
            To = "killermh1352@gmail.com",
            Subject = "Forgot password",
            OTP = OTP,
            Username = $"{user.Firstname} {user.Lastname}"
        };

        var mailType = StreamingChannelConstants.FORGOT_PASSWORD_CHANNEL;
        //sending mail
        await _streamingPublisher.PublishAsync(mailType, mailRequest);

        var protectOtp = RandomString.GenerateOTP(4);
        //store userId to session
        Response.HttpContext.Session.SetString("otp_tracking", $"{user.Id}-{protectOtp}");
        Response.HttpContext.Session.SetString("type", mailType);


        //cache otp 
        var expirationTime = DateTime.Now.AddMinutes(2);
        await _cacheService.SetData($"{user.Id}_{protectOtp}", OTP, expirationTime);

        return NoContent();
    }
    [HttpPost("forgot/verify")]
    public async Task<ActionResult<UserReadDto>> VerifyOtp([FromBody] UserActivatedDto userRequest)
    {
        var session = Request.HttpContext.Session.GetString("otp_tracking") ?? "-";
        var (userId, protectOtp, rest) = session.Split("-");

        var otp = await _cacheService.GetData<string>($"{userId}_{protectOtp}");

        var UserResponse = await _userService.VerifyOtp(userRequest, otp, userId!);

        // clear cache
        await _cacheService.RemoveData($"{userId}_{protectOtp}");

        // remove session
        Response.HttpContext.Session.Remove("otp_tracking");
        Response.HttpContext.Session.Remove("type");

        // set userId for change password
        Response.HttpContext.Session.SetString("user_id", userId!);
        return Ok(UserResponse);

    }

    //nen co middleware check quyen truy cap vao otp nay
    [HttpPost("forgot/change")]
    public async Task<ActionResult> ChangePassword([FromBody] UserForgotDto userRequest)
    {
        var userId = Request.HttpContext.Session.GetString("user_id");
        await _userService.ForgotPassword(userRequest, userId!);
        return NoContent();
    }
    [HttpPost("login")]
    public async Task<ActionResult<object>> Login([FromBody] UserCreateDto userRequest)
    {
        var (token, user) = await _userService.Login(userRequest);
        var response = new { AccessToken = token.AccessToken, User = user };

        //save refreshtoken to redis
        var expirationTime = DateTime.Now.AddHours(1);
        await _cacheService.SetData($"{user.Id}_refresh_token", token.RefreshToken, expirationTime);
        return Ok(response);
    }
}