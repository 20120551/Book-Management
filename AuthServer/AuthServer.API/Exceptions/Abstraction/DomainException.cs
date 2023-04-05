using System.Net;

namespace AuthServer.API.Exceptions.Abstraction;

abstract public class DomainException : Exception
{
    public DomainException(string message) : base(message)
    {
    }

    public abstract HttpStatusCode GetHttpStatusCode();
}