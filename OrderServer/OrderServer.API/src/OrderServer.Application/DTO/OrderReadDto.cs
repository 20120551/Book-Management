using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.DTO
{
    public class OrderReadDto
    {
        public Guid Id { get; set; }
        public string State { get; set; } = null!;
        public float TotalPrice { get; set; }
        public Receiver Receiver { get; set; } = null!;
        public ICollection<MovieItemReadDto> Movies { get; set; } = new List<MovieItemReadDto>();
    }
}
