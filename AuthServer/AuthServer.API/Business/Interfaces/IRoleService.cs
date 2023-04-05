using AuthServer.API.Dto.Role;
using AuthServer.API.Models;

namespace AuthServer.API.Business.Interfaces;

public interface IRoleService
{
    Task<IEnumerable<RoleReadDto>> GetAll();
    Task<RoleReadDto?> GetRoleById(string id);
    Task<RoleReadDto?> GetRoleBySlug(string slug);
    Task<RoleReadDto> Create(RoleCreateDto roleRequest);
    Task Update(string id, RoleUpdateDto roleRequest);
    Task Delete(string id);
    Task<RoleReadDto> AddPermission(string id, RolePermissionDto permission);
    Task<RoleReadDto> DeletePermission(string id, RolePermissionDto permission);
}