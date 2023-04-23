namespace AuthServer.API.Dto.Event;
public record UserCreated(Guid UserId, string Username, string FirstName, string LastName);