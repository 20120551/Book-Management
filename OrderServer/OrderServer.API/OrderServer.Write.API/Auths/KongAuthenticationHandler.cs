using Amazon.Runtime.Internal;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace OrderServer.Read.API.Auths
{
    public class KongAuthenticationHandler : AuthenticationHandler<KongAuthenticationOptions>
    {
        public KongAuthenticationHandler(
            IOptionsMonitor<KongAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock
            ) : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (Request.Headers["X-AUTHENTICATED"] == StringValues.Empty || Request.Headers["X-AUTHENTICATED"] == false)
            {
                return Task.FromResult(AuthenticateResult.Fail("Not Authentication"));
            }

            var userId = (string)Request.Headers["X-USER-ID"]!;
            var roles = Request.Headers["X-ROLES-NAME"]!;
            var operators = Request.Headers["X-OPERATORS-METHOD"]!;

            // loop through role and add it
            // loop through operators to add claim .requireClaim("permission", "value")
            var identity = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.NameIdentifier, userId)

            }, "KONG_AUTHENTICATION_SCHEME");

            var _roles = JsonConvert.DeserializeObject<List<string>>(roles!);
            var _operators = JsonConvert.DeserializeObject<List<string>>(operators!);
            Claim? claim;

            //add role to identity claim
            foreach (var role in _roles!)
            {
                claim = new Claim(ClaimTypes.Role, role!);
                identity.AddClaim(claim);
            }

            //add permission to identity claim
            foreach (var permission in _operators!)
            {
                claim = new Claim("permission", permission!);
                identity.AddClaim(claim);
            }

            var principal = new ClaimsPrincipal(identity);

            return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(principal, Scheme.Name)));
        }
    }
}
