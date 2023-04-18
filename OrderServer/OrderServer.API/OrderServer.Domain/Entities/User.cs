using OrderServer.Domain.Exceptions;
using OrderServer.Domain.ValueObjects;
using OrderServer.Shared.Domain;

namespace OrderServer.Domain.Entities
{
    public class User
    {
        public UserId Id { get; private set; }
        public string Username { get; set; }
        private string _firstName { get; set; }
        private string _lastName { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();

        private User() { }

        internal User(UserId id, string username, string firstName, string lastName)
        {
            Username = username;
            _firstName = firstName;
            _lastName = lastName;
            Id = id;
        }

        // method
        public Order? GetOrder(OrderId id)
        {
            return Orders.FirstOrDefault(o => o.Id == id);
        }

        public void AddOrder(Order order)
        {
            var _order = Orders.FirstOrDefault(o => o.Id == order.Id);
            if (_order is not null)
            {
                // throw exception
                throw new ExistOrderException(this);
            }
            Orders.Add(order);
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
