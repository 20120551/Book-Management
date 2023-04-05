using AuthServer.API.Models;

namespace AuthServer.API.DataAccess.Interfaces;

public interface IPermissionRepo
{
    Task<IEnumerable<Permission>> GetAll();
    Task<Permission?> GetPermissionById(string id);
    Task<Permission?> GetPermissionBySlug(string slug);
    Task<Permission> Create(Permission permission);
    Task Update(Permission permission);
    Task Delete(Permission permission);
}