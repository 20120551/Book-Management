using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.DTO
{
    public class UserReadDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = null!;
        public ICollection<OrderReadDto> Orders { get; set; } = new List<OrderReadDto>();
    }
}
