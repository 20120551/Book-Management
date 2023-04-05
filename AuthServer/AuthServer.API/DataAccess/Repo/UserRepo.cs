using Microsoft.EntityFrameworkCore;
using AuthServer.API.Data;
using AuthServer.API.Models;
using AuthServer.API.DataAccess.Interfaces;

namespace AuthServer.API.DataAccess.Repo;

public class UserRepo : IUserRepo
{
    private readonly AppDbContext _context;

    public UserRepo(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddRole(User user, Role role)
    {
        user.Roles.Add(role);
        await _context.SaveChangesAsync();
    }

    public async Task<User> Create(User user)
    {
        var result = await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task Delete(User user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteRole(User user, Role role)
    {
        user.Roles.Remove(role);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<User>> GetAll()
    {
        var result = await _context.Users
            .Include(u => u.Roles)
            .ToListAsync();
        return result;
    }

    public async Task<User?> GetUserById(string id)
    {
        var user = await _context.Users
            .Include(r => r.Roles)
            .FirstOrDefaultAsync(c => c.Id == id);
        return user;
    }

    public async Task<User?> GetUserByUsername(string username)
    {
        var user = await _context.Users
            .Include(r => r.Roles)
            .FirstOrDefaultAsync(c => c.Username == username);
        return user;
    }

    public bool IsExistRole(User user, Role role)
    {
        var result = user.Roles.Contains(role);
        return result;
    }

    public async Task Update(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
}