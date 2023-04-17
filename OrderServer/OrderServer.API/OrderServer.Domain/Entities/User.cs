using OrderServer.Domain.Exceptions;
using OrderServer.Domain.ValueObjects;
using OrderServer.Shared.Domain;

namespace OrderServer.Domain.Entities
{
    public class User : Aggregation<Guid>
    {
        public UserId Id { get; private set; }
        public string Username { get; set; }
        private string _firstName { get; set; }
        private string _lastName { get; set; }
        private ICollection<Order> _orders { get; set; } = new List<Order>();

        private User() { }

        internal User(UserId id, string username, string firstName, string lastName)
        {
            Username = username;
            _firstName = firstName;
            _lastName = lastName;
            Id = id;
        }

        // method
        public void AddOrder(Order order)
        {
            var _order = _orders.FirstOrDefault(o => o.Id == order.Id);
            if (_order is not null)
            {
                // throw exception
                throw new ExistOrderException(this);
            }
            _orders.Add(order);
        }

        public void AddOrders(List<Order> orders)
        {
            foreach (var order in orders)
            {
                AddOrder(order);
            }
        }
        // update changed
        public void ChangeProperty(string firstName, string lastName)
        {
            _firstName = firstName;
            _lastName = lastName;
        }
    }
}
