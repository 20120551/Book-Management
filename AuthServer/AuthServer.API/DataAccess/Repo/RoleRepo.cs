using AuthServer.API.Data;
using AuthServer.API.Models;
using AuthServer.API.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AuthServer.API.DataAccess.Repo;

public class RoleRepo : IRoleRepo
{
    private readonly AppDbContext _context;

    public RoleRepo(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddPermisson(Role role, Permission permission)
    {
        role.Permissions.Add(permission);
        await _context.SaveChangesAsync();
    }

    public async Task<Role> Create(Role role)
    {
        var result = await _context.Roles.AddAsync(role);
        await _context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task Delete(Role role)
    {
        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();
    }

    public async Task DeletePermission(Role role, Permission permission)
    {
        role.Permissions.Remove(permission);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Role>> GetAll()
    {
        var roles = await _context.Roles
            .Include(r => r.Permissions)
            .ToListAsync();
        return roles;
    }

    public async Task<Role?> GetRoleById(string id)
    {
        var role = await _context.Roles
            .Include(p => p.Permissions)
            .FirstOrDefaultAsync(c => c.Id == id);
        return role;
    }

    public async Task<Role?> GetRoleBySlug(string slug)
    {
        var role = await _context.Roles
            .Include(p => p.Permissions)
            .FirstOrDefaultAsync(c => c.Slug == slug);
        return role;
    }

    public bool IsExistPermission(Role role, Permission permission)
    {
        var result = role.Permissions.Contains(permission);
        return result;
    }

    public async Task Update(Role role)
    {
        _context.Roles.Update(role);
        await _context.SaveChangesAsync();
    }
}