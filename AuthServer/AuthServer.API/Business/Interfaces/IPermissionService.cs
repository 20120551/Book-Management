using AuthServer.API.Dto.Permission;

namespace AuthServer.API.Business.Interfaces;

public interface IPermissionService
{
    Task<IEnumerable<PermissionReadDto>> GetAll();
    Task<PermissionReadDto> Get(string slug);
    Task<PermissionReadDto> Create(PermissionCreateDto permissionRequest);
    Task Update(string id, PermissionUpdateDto permissionRequest);
    Task Delete(string id);
}