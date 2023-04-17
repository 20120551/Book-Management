using OrderServer.Domain.Enums;
using OrderServer.Domain.Exceptions;
using OrderServer.Domain.ValueObjects;
using OrderServer.Shared.Domain;

/*
    CART: store in redis associate with movieItem on movie server
    CART_EXPIRE: 24h --> send event delete order associate with it (find by state and cartId)
    --> send user-id-temp to client via session
    --> cache cartId on redis
    --> cartId: == [{Item1, quantity, price}]
    --> shared cart accross movie and order service

    [GET]    /movie/cart
    [POST]   /movie/cart
    [PUT]    /movie/cart
    
 */
/*  
    [GET]    /order -> get all order of user
    [GET]    /order/{orderId} -> get particular order
    [POST]   /order --> clear cart / require login
    [PUT]    /order/${orderId}
    [DELETE] /order/${orderId} --> change state
 */
namespace OrderServer.Domain.Entities
{
    public class Order
    {
        public OrderId Id { get; private set; }
        private string _state { get; set; }
        private float _totalPrice { get; set; }
        private Receiver _receiver { get; set; }
        private ICollection<MovieItem> _movies { get; set; } = new List<MovieItem>();
        // receiver
        public User User { get; set; }
        public UserId UserId { get; set; }
        //payment
        private Guid _paymentId { get; set; }

        private Order() { }
        internal Order(OrderId id, Receiver receiver, User user)
        {
            Id = id;
            _receiver = receiver;
            User = user;

            // default state
            _state = StateEnum.Created.ToString();

            // set userId
            UserId = user.Id;

            // caclculate total price
            _calculateTotalPrice();
        }

        //method

        /// <summary>
        /// AddMovie
        /// </summary>
        /// <param name="movie"></param>
        /// <exception cref="ExistMovieItemException"></exception>
        public void AddMovie(MovieItem movie)
        {
            // check movie exist or not
            var _movie = _movies.FirstOrDefault(x => x.Id == movie.Id);
            if (_movie is not null)
            {
                //throw exception
                throw new ExistMovieItemException();
            }
            _movies.Add(movie);
        }

        /// <summary>
        /// AddMovies
        /// </summary>
        /// <param name="movies"></param>
        public void AddMovies(IEnumerable<MovieItem> movies)
        {
            foreach (var movie in movies)
            {
                AddMovie(movie);
            }
        }

        /// <summary>
        /// ChangeState
        /// </summary>
        /// <param name="state"></param>
        public void ChangeState(StateEnum state)
        {
            _state = state.ToString();
        }

        /// <summary>
        /// CalculateTotalPrice
        /// </summary>
        private void _calculateTotalPrice()
        {
            foreach (var movie in _movies)
            {
                _totalPrice += movie.Price;
            }
        }

        /// <summary>
        /// UpdatePaymentId
        /// </summary>
        /// <param name="paymentId"></param>
        /// <exception cref="EmptyPaymentIdException"></exception>
        public void UpdatePaymentId(Guid id)
        {
            if (id == Guid.Empty)
            {
                // throw exception
                throw new EmptyPaymentIdException();
            }
            _paymentId = id;
        }
    }
}
