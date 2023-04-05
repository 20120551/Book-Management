using System.ComponentModel.DataAnnotations;

namespace AuthServer.API.Dto.Operation;

public class OperationReadDto
{
    [Required(ErrorMessage = "This field is required")]
    public string Id { get; set; } = null!;

    [Required(ErrorMessage = "This field is required")]
    public string Operator { get; set; } = null!;
    public string Description { get; set; } = null!;
}