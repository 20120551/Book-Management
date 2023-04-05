using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AuthServer.API.Models.Shared;
using AuthServer.API.Utils;

namespace AuthServer.API.Models;

public class Operation : DateTimeSharedEntity
{
    [Key]
    [Required(ErrorMessage = "This field is required")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = RandomString.GenerateIdWithPrefix("Operation");

    [Required(ErrorMessage = "This field is required")]
    public string Operator { get; set; } = null!;
    public string Description { get; set; } = null!;
}