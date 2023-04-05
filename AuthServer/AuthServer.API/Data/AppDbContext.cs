using AuthServer.API.Models;
using AuthServer.API.Models.Shared;
using Microsoft.EntityFrameworkCore;

namespace AuthServer.API.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<Operation> Operations => Set<Operation>();

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        AddTimeStamps();
        return base.SaveChangesAsync();
    }

    public AppDbContext(DbContextOptions options) : base(options)
    {

    }

    private void AddTimeStamps()
    {
        var entities = ChangeTracker.Entries()
            .Where(x => x.Entity is DateTimeSharedEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

        foreach (var entity in entities)
        {
            var now = DateTime.UtcNow;
            if (entity.State == EntityState.Added)
            {
                ((DateTimeSharedEntity)entity.Entity).CreateAt = now;
            }
            ((DateTimeSharedEntity)entity.Entity).UpdateAt = now;
        }
    }
}