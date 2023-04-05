using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AuthServer.API.Models.Shared;
using AuthServer.API.Utils;

namespace AuthServer.API.Models;

public class Permission : DateTimeSharedEntity
{
    [Key]
    [Required(ErrorMessage = "This field is required")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = RandomString.GenerateIdWithPrefix("Permission");

    [Required(ErrorMessage = "This field is required")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "This field is required")]
    public string Service { get; set; } = null!;

    [Required(ErrorMessage = "This field is required")]

    public string Title { get; set; } = null!;
    public string Slug { get; set; } = null!;

    // [ForeignKey(nameof(Role))]
    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    // [ForeignKey(nameof(Operation))]
    public string OperationId { get; set; } = null!;
    public Operation Operation { get; set; } = null!;
}