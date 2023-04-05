using System.Security.Claims;
using System.Text.Encodings.Web;
using AuthServer.API.Constants;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Models;
using AuthServer.API.Policies.Authentication.Interfaces;
using AuthServer.API.Policies.Authentication.Schemes;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

namespace AuthServer.API.Policies.Authentication.Handlers;

public class JwtAuthenticationHandler : AuthenticationHandler<JwtAuthenticationOptions>
{
    private readonly IOptionsMonitor<JwtAuthenticationOptions> options;
    private readonly ILoggerFactory logger;
    private readonly UrlEncoder encoder;
    private readonly ISystemClock clock;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ITokenGenerator _tokenGenerator;
    private readonly IUserRepo _userRepo;

    public JwtAuthenticationHandler(
        IOptionsMonitor<JwtAuthenticationOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        IHttpContextAccessor httpContextAccessor,
        ITokenGenerator tokenGenerator,
        IUserRepo userRepo
    ) : base(options, logger, encoder, clock)
    {
        this.options = options;
        this.logger = logger;
        this.encoder = encoder;
        this.clock = clock;

        _httpContextAccessor = httpContextAccessor;
        _tokenGenerator = tokenGenerator;
        _userRepo = userRepo;
    }

    protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey(HeaderNames.Authorization))
        {
            return AuthenticateResult.Fail("Header Not Found.");
        }

        var header = Request.Headers[HeaderNames.Authorization].ToString();

        var token = header.Split(" ")[1];
        User? user = null;
        try
        {
            var payload = await _tokenGenerator.Verify(token);
            user = await _userRepo.GetUserById((string)payload["id"]);
            if (user == null)
            {
                return AuthenticateResult.Fail("User id is not correct");
            }
        }
        catch (Exception ex)
        {
            return AuthenticateResult.Fail(ex.Message);
        }
        var identity = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim("Username", user.Username),
        }, AuthenticationSchemeConstants.JWT_AUTHENTICATION_SCHEME);

        Claim? claim;
        foreach (var role in user.Roles)
        {
            claim = new Claim(ClaimTypes.Role, role.Name);
            identity.AddClaim(claim);
        }

        var principal = new ClaimsPrincipal(identity);

        // await _httpContextAccessor?.HttpContext?.SignInAsync(
        //     Scheme.Name, principal)!;

        return AuthenticateResult.Success(new AuthenticationTicket(principal, Scheme.Name));
    }
}