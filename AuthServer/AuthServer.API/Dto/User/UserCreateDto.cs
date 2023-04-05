using System.ComponentModel.DataAnnotations;

namespace AuthServer.API.Dto.User;

public class UserCreateDto
{
    [Required(ErrorMessage = "This field is required")]
    public string? Username { get; set; }
    [Required(ErrorMessage = "This field is required")]
    public string? Password { get; set; }
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }
    public ICollection<UserRoleDto>? Roles;
}