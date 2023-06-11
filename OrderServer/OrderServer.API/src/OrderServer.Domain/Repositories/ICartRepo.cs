using OrderServer.Domain.Entities;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.Repositories
{
    public interface ICartRepo
    {
        Task<Cart?> GetAsync(CartId id);
        Task DeleteAsync(Cart cart);
    }
}
