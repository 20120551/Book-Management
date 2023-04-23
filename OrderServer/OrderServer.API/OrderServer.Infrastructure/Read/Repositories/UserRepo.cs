using MongoDB.Driver;
using OrderServer.Domain.Entities;
using OrderServer.Domain.Repositories;
using OrderServer.Domain.ValueObjects;

namespace OrderServer.Infrastructure.Read.Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly IMongoCollection<User> _userCollection;
        public UserRepo(
            IMongoDatabase mongoDatabase)
        {
            _userCollection = mongoDatabase.GetCollection<User>("user");
        }
        public Task CreateAsync(User user)
        {
            return _userCollection.InsertOneAsync(user);
        }

        public Task DeleteAsync(User user)
        {
            return _userCollection.DeleteOneAsync(u => u.Id == user.Id);
        }

        public Task<User?> GetAsync(UserId id)
        {
            var result = _userCollection.Aggregate()
                .Match(u => u.Id == id)
                //.Lookup<Order, User?>("order", "Orders", "Id", "order")
                .FirstOrDefaultAsync();

            return result;
        }

        public Task UpdateAsync(User user)
        {
            return _userCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
        }
    }
}
