namespace AuthServer.API.Dto.Event;
public record UserUpdated(Guid UserId, string FirstName, string LastName);