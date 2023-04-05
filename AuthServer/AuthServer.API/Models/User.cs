using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AuthServer.API.Models.Shared;
using AuthServer.API.Utils;

namespace AuthServer.API.Models;

public class User : DateTimeSharedEntity
{
    [Key]
    [Required(ErrorMessage = "This field is required")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = RandomString.GenerateIdWithPrefix("US");
    [Required(ErrorMessage = "This field is required")]
    public string Username { get; set; } = "";
    [Required(ErrorMessage = "This field is required")]
    public string Password { get; set; } = "";
    [Required(ErrorMessage = "This field is required")]
    public string Kid { get; set; } = "";

    public string? Firstname { get; set; }
    public string? Lastname { get; set; }
    public string? PhoneNumber { get; set; }
    public bool IsActiveAccount { get; set; } = false;
    public bool IsActivePhoneNumber { get; set; } = false;

    // [ForeignKey(nameof(Role))]
    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    public void Deconstruct(out string username, out string password)
    {
        username = Username;
        password = Password;
    }
}