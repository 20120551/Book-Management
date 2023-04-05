using System.Net;
using AuthServer.API.Exceptions.Abstraction;

namespace AuthServer.API.Exceptions.Handler;

public class DomainNotFoundException : DomainException
{
    public DomainNotFoundException(string message) : base(message)
    {
    }

    public override HttpStatusCode GetHttpStatusCode()
    {
        return HttpStatusCode.NotFound;
    }
}