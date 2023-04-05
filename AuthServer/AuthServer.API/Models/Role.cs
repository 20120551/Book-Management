using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AuthServer.API.Models.Shared;
using AuthServer.API.Utils;

namespace AuthServer.API.Models;

public class Role : DateTimeSharedEntity
{
    [Key]
    [Required(ErrorMessage = "This field is required")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = RandomString.GenerateIdWithPrefix("Role");
    [Required(ErrorMessage = "This field is required")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "This field is required")]
    public string Title { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string? Description { get; set; }

    // [ForeignKey(nameof(User))]
    public virtual ICollection<User> Users { get; set; } = new List<User>();

    // [ForeignKey(nameof(Permission))]
    public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}