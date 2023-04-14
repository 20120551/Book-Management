using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    [POST]   /order
    [PUT]    /order/${orderId}
    [DELETE] /order/${orderId} --> change state
 */
namespace OrderServer.Domain.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public string State { get; set; }
        public float TotalPrice { get; set; }
        public string Event { get; set; }
        public ICollection<MovieItem> Movies { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }

        //payment
        public Guid PaymentId { get; set; }
        //cart
        public Guid CartId { get; set; }
    }
}
