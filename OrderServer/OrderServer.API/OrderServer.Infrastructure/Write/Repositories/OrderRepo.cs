using Microsoft.EntityFrameworkCore;
using OrderServer.Domain.Entities;
using OrderServer.Domain.Repositories;
using OrderServer.Domain.ValueObjects;
using OrderServer.Infrastructure.Write.Contexts;

namespace OrderServer.Infrastructure.Write.Repositories
{
    public class OrderRepo : IOrderRepo
    {
        private readonly DbSet<Order> _orders;
        private readonly AppDbContext _context;
        public OrderRepo(AppDbContext context)
        {
            _orders = context.Orders;
            _context = context;
        }
        public async Task CreateAsync(Order order)
        {
            await _orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Order order)
        {
            _orders.Remove(order);
            await _context.SaveChangesAsync();
        }

        public async Task<Order?> GetAsync(OrderId id)
        {
            var order = await _orders.FirstOrDefaultAsync(c => c.Id == id);
            return order;
        }

        public async Task UpdateAsync(Order order)
        {
            _orders.Update(order);
            await _context.SaveChangesAsync();
        }
    }
}
