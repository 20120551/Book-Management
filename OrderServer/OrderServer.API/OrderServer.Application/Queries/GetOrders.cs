using OrderServer.Application.DTO;
using OrderServer.Shared.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Application.Queries
{
    public record GetOrders(Guid UserId): IQuery<UserReadDto>;
}
