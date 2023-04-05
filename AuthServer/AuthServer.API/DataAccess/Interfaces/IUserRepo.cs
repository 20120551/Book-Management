using AuthServer.API.Models;

namespace AuthServer.API.DataAccess.Interfaces;


public interface IUserRepo
{
    Task<IEnumerable<User>> GetAll();
    Task<User?> GetUserByUsername(string username);
    Task<User?> GetUserById(string id);
    Task<User> Create(User user);
    Task Update(User user);
    Task Delete(User user);
    Task AddRole(User user, Role role);
    Task DeleteRole(User user, Role role);
    bool IsExistRole(User user, Role role);
}