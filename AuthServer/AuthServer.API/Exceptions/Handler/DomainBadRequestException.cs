using System.Net;
using AuthServer.API.Exceptions.Abstraction;

namespace AuthServer.API.Exceptions.Handler;

public class DomainBadRequestException : DomainException
{
    public DomainBadRequestException(string message) : base(message)
    {
    }

    public override HttpStatusCode GetHttpStatusCode()
    {
        return HttpStatusCode.BadRequest;
    }
}