using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Domain.ValueObjects
{
    public record Receiver(string FullName, string Address, string PhoneNumber);
}
