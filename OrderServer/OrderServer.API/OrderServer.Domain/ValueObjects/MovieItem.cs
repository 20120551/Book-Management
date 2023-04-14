using OrderServer.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//movie/add-to-cart

namespace OrderServer.Domain.ValueObjects
{
    public class MovieItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Seat { get; set; }
        public int Quantity { get; set; }
    }
}
