using AuthServer.API.Business.Interfaces;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Dto.Role;
using AuthServer.API.Exceptions.Handler;
using AuthServer.API.Extensions;
using AuthServer.API.Models;
using AutoMapper;

namespace AuthServer.API.Business.Services;

public class RoleService : IRoleService
{
    private readonly IRoleRepo _roleRepo;
    private readonly IPermissionRepo _permissionRepo;
    private readonly IMapper _mapper;

    public RoleService(
        IRoleRepo roleRepo,
        IPermissionRepo permissionRepo,
        IMapper mapper)
    {
        _roleRepo = roleRepo;
        _permissionRepo = permissionRepo;
        _mapper = mapper;
    }

    public async Task<RoleReadDto> AddPermission(string id, RolePermissionDto permission)
    {
        var role = await _roleRepo.GetRoleById(id);
        if (role == null)
        {
            throw new DomainBadRequestException("role was not found");
        }

        var _permission = await _permissionRepo.GetPermissionById(permission.PermissionId);
        if (_permission == null)
        {
            throw new DomainBadRequestException("permission was not found");
        }

        var isExist = _roleRepo.IsExistPermission(role, _permission);
        if (isExist == true)
        {
            throw new DomainConflictException("permission has existed on role");
        }
        await _roleRepo.AddPermisson(role, _permission);
        var roleResponse = _mapper.Map<RoleReadDto>(role);
        return roleResponse;
    }

    public async Task<RoleReadDto> Create(RoleCreateDto roleRequest)
    {
        var role = _mapper.Map<Role>(roleRequest);

        //add slug
        var _role = await _roleRepo.Create(role);

        //mapper
        var roleResponse = _mapper.Map<RoleReadDto>(_role);
        return roleResponse;
    }

    public async Task Delete(string id)
    {
        // find role by slug
        var role = await _roleRepo.GetRoleById(id);
        if (role == null)
        {
            throw new DomainBadRequestException("Role was not found");
        }
        // delete role
        await _roleRepo.Delete(role);
    }

    public async Task<RoleReadDto> DeletePermission(string id, RolePermissionDto permission)
    {
        var role = await _roleRepo.GetRoleById(id);
        if (role == null)
        {
            throw new DomainBadRequestException("role was not found");
        }

        var _permission = await _permissionRepo.GetPermissionById(permission.PermissionId);
        if (_permission == null)
        {
            throw new DomainBadRequestException("permission was not found");
        }

        var isExist = _roleRepo.IsExistPermission(role, _permission);
        if (isExist == false)
        {
            throw new DomainConflictException("permission has not existed on role");
        }
        await _roleRepo.DeletePermission(role, _permission);
        var roleResponse = _mapper.Map<RoleReadDto>(role);
        return roleResponse;
    }

    public async Task<IEnumerable<RoleReadDto>> GetAll()
    {
        var roles = await _roleRepo.GetAll();

        var roleResponse = _mapper.Map<IEnumerable<RoleReadDto>>(roles);
        return roleResponse;
    }

    public async Task<RoleReadDto?> GetRoleById(string id)
    {
        var role = await _roleRepo.GetRoleById(id);
        if (role == null)
        {
            throw new DomainBadRequestException("Role was not exist");
        }

        var roleResponse = _mapper.Map<RoleReadDto>(role);
        return roleResponse;
    }

    public async Task<RoleReadDto?> GetRoleBySlug(string slug)
    {
        var role = await _roleRepo.GetRoleBySlug(slug);
        if (role == null)
        {
            throw new DomainBadRequestException("Role was not exist");
        }

        var roleResponse = _mapper.Map<RoleReadDto>(role);
        return roleResponse;
    }

    public async Task Update(string id, RoleUpdateDto role)
    {
        // find role by slug
        var _role = await _roleRepo.GetRoleById(id);
        if (_role == null)
        {
            throw new DomainBadRequestException("role was not found");
        }

        //update role
        _mapper.Map(role, _role);

        //update role 
        await _roleRepo.Update(_role);
    }
}