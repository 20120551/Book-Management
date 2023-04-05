using System.ComponentModel.DataAnnotations;

namespace AuthServer.API.Dto.Permission;

public class PermissionUpdateDto
{
    [Required(ErrorMessage = "This field is required")]
    public string Name { get; set; } = null!;
    [Required(ErrorMessage = "This field is required")]
    public string Service { get; set; } = null!;

    public string Title { get; set; } = null!;
}