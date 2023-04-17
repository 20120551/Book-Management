using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.DTO
{
    public class UserReadDto
    {
        public Guid Id { get; private set; }
        public string FullName { get; private set; }
    }
}
