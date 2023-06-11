using Microsoft.EntityFrameworkCore;
using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;

namespace OrderServer.Infrastructure.Write.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("order_server");
            var configuration = new DbConfiguration();
            modelBuilder.ApplyConfiguration<Order>(configuration);
            modelBuilder.ApplyConfiguration<Receiver>(configuration);
            modelBuilder.ApplyConfiguration<MovieItem>(configuration);
            modelBuilder.ApplyConfiguration<User>(configuration);

            // force delete
            modelBuilder
                .Entity<User>()
                .HasMany(e => e.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.ClientCascade);
        }
    }
}
