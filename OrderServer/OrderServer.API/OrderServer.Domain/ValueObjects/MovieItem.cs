using OrderServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//movie/add-to-cart

namespace OrderServer.Domain.ValueObjects
{
    public record MovieItem(Guid Id, string Name, float Price, string Seat, int Quantity);
}
