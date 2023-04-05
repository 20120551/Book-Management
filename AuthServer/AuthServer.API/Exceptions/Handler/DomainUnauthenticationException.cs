using System.Net;
using AuthServer.API.Exceptions.Abstraction;

namespace AuthServer.API.Exceptions.Handler;

public class DomainUnauthenticationException : DomainException
{
    public DomainUnauthenticationException(string message) : base(message)
    {
    }

    public override HttpStatusCode GetHttpStatusCode()
    {
        return HttpStatusCode.Unauthorized;
    }
}