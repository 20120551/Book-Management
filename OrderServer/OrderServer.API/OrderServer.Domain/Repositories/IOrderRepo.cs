using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Repositories
{
    public interface IOrderRepo
    {
        Task<Order> GetAsync(OrderId id);
        Task CreateAsync(Order order);
        Task UpdateAsync(Order order);
        Task DeleteAsync(Order order);
    }
}
