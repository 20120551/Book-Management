using System.ComponentModel.DataAnnotations;

namespace AuthServer.API.Dto.Role;

public class RoleCreateDto
{
    [Required(ErrorMessage = "This field is required")]
    public string Name { get; set; } = null!;
    [Required(ErrorMessage = "This field is required")]
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
}