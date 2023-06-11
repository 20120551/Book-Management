using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;

namespace OrderServer.Infrastructure.Write.Contexts
{
    internal sealed class DbConfiguration : IEntityTypeConfiguration<Order>,
        IEntityTypeConfiguration<MovieItem>,
        IEntityTypeConfiguration<Receiver>,
        IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            // set primary key
            builder.HasKey(x => x.Id);

            // set conversion
            builder
             .Property(x => x.Id)
             .HasConversion(id => id.Id, id => new OrderId(id));
            builder
                .Property(typeof(string), "_state")
                .HasColumnName("Status");
            builder
                .Property(typeof(float), "_totalPrice")
                .HasColumnName("TotalPrice");
            builder
                .Property(x => x.UserId)
                .HasConversion(id => id.Id, id => new UserId(id));

            // constrain
            builder
                .HasMany(typeof(MovieItem), "_movies");
            builder
                .HasOne(typeof(Receiver), "_receiver");
            builder
                .HasOne(typeof(User), "User");

            // build
            builder.ToTable("order");
        }

        public void Configure(EntityTypeBuilder<Receiver> builder)
        {
            builder.Property<Guid>("Id");
            builder.Property(p => p.Address);
            builder.Property(p => p.PhoneNumber);
            builder.Property(p => p.FullName);

            // to table
            builder.ToTable("receiver");
        }

        public void Configure(EntityTypeBuilder<User> builder)
        {
            // set key
            builder.HasKey(x => x.Id);

            // set conversion
            builder
                .Property(x => x.Id)
             .HasConversion(id => id.Id, id => new UserId(id));
            builder
                .Property(x => x.Username);
            builder
                .Property(typeof(string), "_firstName")
                .HasColumnName("FistName");
            builder
                .Property(typeof(string), "_lastName")
                .HasColumnName("LastName");

            // add constrain
            builder.HasMany(typeof(Order), "Orders");

            // create table
            builder.ToTable("user");
        }

        public void Configure(EntityTypeBuilder<MovieItem> builder)
        {
            // set key
            builder.HasKey(x => new { x.Id, x.OrderId });
            // add convension
            builder.Property(x => x.Id);
            builder
                .Property(x => x.Quantity);
            builder
                .Property(x => x.Name);
            builder
                .Property(x => x.Seat);
            builder
                .Property(x => x.Price);
            builder
                .Property(x => x.OrderId)
                .HasConversion(id => id.Id, id => new OrderId(id));

            // to table
            builder.ToTable("movie");
        }
    }
}
