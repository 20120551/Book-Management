using AuthServer.API.Data;
using AuthServer.API.Models;
using AuthServer.API.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AuthServer.API.DataAccess.Repo;

public class PermissionRepo : IPermissionRepo
{
    private readonly AppDbContext _context;

    public PermissionRepo(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Permission> Create(Permission permission)
    {
        var result = await _context.Permissions.AddAsync(permission);
        await _context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task Delete(Permission permission)
    {
        _context.Permissions.Remove(permission);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Permission>> GetAll()
    {
        var permissions = await _context.Permissions
            .Include(p => p.Operation)
            .ToListAsync();
        return permissions;
    }

    public async Task<Permission?> GetPermissionById(string id)
    {
        var permission = await _context.Permissions
            .Include(p => p.Operation)
            .FirstOrDefaultAsync(p => p.Id == id);
        return permission;
    }

    public async Task<Permission?> GetPermissionBySlug(string slug)
    {
        var permission = await _context.Permissions
            .Include(p => p.Operation)
            .FirstOrDefaultAsync(p => p.Slug == slug);
        return permission;
    }

    public async Task Update(Permission permission)
    {
        _context.Permissions.Update(permission);
        await _context.SaveChangesAsync();
    }
}