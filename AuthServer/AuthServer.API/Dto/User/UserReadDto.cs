using System.ComponentModel.DataAnnotations;
using AuthServer.API.Dto.Role;

namespace AuthServer.API.Dto.User;

public class UserReadDto
{
    [Required(ErrorMessage = "This field is required")]
    public string Id { get; set; } = null!;
    [Required(ErrorMessage = "This field is required")]
    public string Username { get; set; } = null!;
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }
    public string? PhoneNumber { get; set; }
    public bool IsActiveAccount { get; set; }
    public bool IsActivePhoneNumber { get; set; }
    public ICollection<RoleReadDto> Roles { get; set; } = null!;
}