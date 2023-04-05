using System.Net;
using AuthServer.API.Exceptions.Abstraction;

namespace AuthServer.API.Exceptions.Handler;

public class DomainConflictException : DomainException
{
    public DomainConflictException(string message) : base(message)
    {
    }

    public override HttpStatusCode GetHttpStatusCode()
    {
        return HttpStatusCode.Conflict;
    }
}