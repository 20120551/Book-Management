using Microsoft.EntityFrameworkCore;
using OrderServer.Domain.Entities;
using OrderServer.Domain.Repositories;
using OrderServer.Domain.ValueObjects;
using OrderServer.Infrastructure.Write.Contexts;

namespace OrderServer.Infrastructure.Write.Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly AppDbContext _context;
        private readonly DbSet<User> _users;
        public UserRepo(AppDbContext context)
        {
            _context = context;
            _users = context.Users;
        }
        public async Task CreateAsync(User user)
        {
            await _users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            _users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetAsync(UserId id)
        {
            var user = await _users
                .FirstOrDefaultAsync(c => c.Id == id);
            return user;
        }

        public async Task UpdateAsync(User user)
        {
            _users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
