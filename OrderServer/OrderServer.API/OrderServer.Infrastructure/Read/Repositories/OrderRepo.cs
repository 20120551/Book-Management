using MongoDB.Driver;
using OrderServer.Domain.Entities;
using OrderServer.Domain.Repositories;
using OrderServer.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read.Repositories
{
    public class OrderRepo : IOrderRepo
    {
        private readonly IMongoCollection<Order> _orderCollection;
        public OrderRepo(
            IMongoDatabase mongoDatabase)
        {
            _orderCollection = mongoDatabase.GetCollection<Order>("order");
        }
        public Task CreateAsync(Order order)
        {
            return _orderCollection.InsertOneAsync(order);
        }

        public Task DeleteAsync(Order order)
        {
            return _orderCollection.DeleteOneAsync(o => o.Id == order.Id);
        }

        public Task<Order?> GetAsync(OrderId id)
        {
            return _orderCollection.Find(o => o.Id == id).FirstOrDefaultAsync()!;
        }

        public Task UpdateAsync(Order order)
        {
            return _orderCollection.ReplaceOneAsync(o => o.Id == order.Id, order);
        }
    }
}
