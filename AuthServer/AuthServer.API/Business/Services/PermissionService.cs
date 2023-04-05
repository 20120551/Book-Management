using AuthServer.API.Business.Interfaces;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Dto.Permission;
using AuthServer.API.Exceptions.Handler;
using AuthServer.API.Extensions;
using AuthServer.API.Models;
using AutoMapper;

namespace AuthServer.API.Business.Services;

public class PermissionService : IPermissionService
{
    private readonly IPermissionRepo _permissionRepo;
    private readonly IMapper _mapper;

    public PermissionService(IPermissionRepo permissionRepo, IMapper mapper)
    {
        _permissionRepo = permissionRepo;
        _mapper = mapper;
    }
    public async Task<PermissionReadDto> Create(PermissionCreateDto permissionRequest)
    {
        var permission = _mapper.Map<Permission>(permissionRequest);

        var _permission = await _permissionRepo.Create(permission);
        var permissionResponse = _mapper.Map<PermissionReadDto>(_permission);
        return permissionResponse;
    }

    public async Task Delete(string id)
    {
        var permission = await _permissionRepo.GetPermissionById(id);
        if (permission == null)
        {
            throw new DomainBadRequestException("Permission was not found");
        }
        await _permissionRepo.Delete(permission);
    }

    public async Task<PermissionReadDto> Get(string slug)
    {
        var permission = await _permissionRepo.GetPermissionBySlug(slug);
        if (permission == null)
        {
            throw new DomainBadRequestException("permission was not found");
        }
        var permissionResponse = _mapper.Map<PermissionReadDto>(permission);
        return permissionResponse;
    }

    public async Task<IEnumerable<PermissionReadDto>> GetAll()
    {
        var permissions = await _permissionRepo.GetAll();
        var permissionResponse = _mapper.Map<IEnumerable<PermissionReadDto>>(permissions);
        return permissionResponse;
    }

    public async Task Update(string id, PermissionUpdateDto permissionRequest)
    {
        var permission = await _permissionRepo.GetPermissionById(id);
        if (permission == null)
        {
            throw new DomainBadRequestException("permission was not found");
        }

        _mapper.Map(permissionRequest, permission);

        await _permissionRepo.Update(permission);
    }
}