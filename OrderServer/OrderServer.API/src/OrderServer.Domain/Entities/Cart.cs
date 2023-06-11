using OrderServer.Domain.ValueObjects;

namespace OrderServer.Domain.Entities
{
    public class Cart
    {
        public CartId Id { get; set; }
        public Receiver Receiver { get; set; }
        public ICollection<MovieItem> MovieItems = new List<MovieItem>();

        private Cart() { }
    }
}
