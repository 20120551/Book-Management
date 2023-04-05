using AuthServer.API.Models;

namespace AuthServer.API.DataAccess.Interfaces;

public interface IRoleRepo
{
    Task<IEnumerable<Role>> GetAll();
    Task<Role?> GetRoleById(string id);
    Task<Role?> GetRoleBySlug(string slug);
    Task<Role> Create(Role role);
    Task Update(Role role);
    Task Delete(Role role);
    Task AddPermisson(Role role, Permission permission);
    Task DeletePermission(Role role, Permission permission);
    bool IsExistPermission(Role role, Permission permission);
}