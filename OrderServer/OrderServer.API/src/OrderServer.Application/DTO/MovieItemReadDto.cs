using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.DTO
{
    public class MovieItemReadDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Seat { get; set; } = null!;
        public int Quantity { get; set; }
        public int Price { get; set; }
    }
}
