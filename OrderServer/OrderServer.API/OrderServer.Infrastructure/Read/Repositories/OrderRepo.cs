using MongoDB.Driver;
using OrderServer.Domain.Entities;
using OrderServer.Domain.Factories;
using OrderServer.Domain.Repositories;
using OrderServer.Domain.ValueObjects;
using OrderServer.Infrastructure.Read.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderServer.Infrastructure.Read.Repositories
{
    public class OrderRepo : IOrderRepo
    {
        private readonly IMongoCollection<OrderModel> _orderCollection;
        private readonly IOrderFactory _orderFactory;
        public OrderRepo(
            IOrderFactory orderFactory,
            IMongoDatabase mongoDatabase)
        {
            _orderCollection = mongoDatabase.GetCollection<OrderModel>("order");
            _orderFactory = orderFactory;
        }
        public Task CreateAsync(Order order)
        {
            var _order = order.AsDto();
            return _orderCollection.InsertOneAsync(_order);
        }

        public Task DeleteAsync(Order order)
        {
            return _orderCollection.DeleteOneAsync(o => o.Id == order.Id.Id);
        }

        public async Task<Order?> GetAsync(OrderId id)
        {
            var order = await _orderCollection.Find(o => o.Id == id.Id).FirstOrDefaultAsync();
            var _order = order.AsDto(_orderFactory);
            return _order;
        }

        public Task UpdateAsync(Order order)
        {
            var _order= order.AsDto();
            return _orderCollection.ReplaceOneAsync(o => o.Id == order.Id.Id, _order);
        }
    }
}
