using MongoDB.Driver;
using OrderServer.Domain.Entities;
using OrderServer.Domain.Factories;
using OrderServer.Domain.Repositories;
using OrderServer.Domain.ValueObjects;
using OrderServer.Infrastructure.Read.Models;

namespace OrderServer.Infrastructure.Read.Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly IMongoCollection<UserModel> _userCollection;
        private readonly IUserFactory _userFactory;
        private readonly IOrderFactory _orderFactory;
        public UserRepo(
            IUserFactory userFactory,
            IOrderFactory orderFactory,
            IMongoDatabase mongoDatabase)
        {
            _userCollection = mongoDatabase.GetCollection<UserModel>("user");
            _userFactory = userFactory;
            _orderFactory = orderFactory;
        }
        public Task CreateAsync(User user)
        {
            return _userCollection.InsertOneAsync(user.AsDto());
        }

        public Task DeleteAsync(User user)
        {
            return _userCollection.DeleteOneAsync(u => u.Id == user.Id.Id);
        }

        public async Task<User?> GetAsync(UserId id)
        {
            var result =await  _userCollection.Aggregate()
                .Match(u => u.Id == id.Id)
                .Lookup<Order, UserModel?>("order", "OrderIds", "Id", "Orders")
                .FirstOrDefaultAsync();

            return result?.AsDto(_userFactory, _orderFactory);
        }

        public Task UpdateAsync(User user)
        {
            return _userCollection.ReplaceOneAsync(u => u.Id == user.Id.Id, user.AsDto());
        }
    }
}
