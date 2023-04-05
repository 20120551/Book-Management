using System.ComponentModel.DataAnnotations;
using AuthServer.API.Dto.Permission;

namespace AuthServer.API.Dto.Role;

public class RoleReadDto
{
    public string Id { get; set; } = null!;
    [Required(ErrorMessage = "This field is required")]
    public string Name { get; set; } = null!;
    [Required(ErrorMessage = "This field is required")]
    public string Title { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string? Description { get; set; }
    public ICollection<PermissionReadDto> Permissions { get; set; } = null!;
}