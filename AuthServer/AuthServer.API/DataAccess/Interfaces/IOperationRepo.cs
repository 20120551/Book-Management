using AuthServer.API.Models;

namespace AuthServer.API.DataAccess.Interfaces;

public interface IOperationRepo
{
    Task<IEnumerable<Operation>> GetAll();
    Task<Operation?> Get(string id);
    Task<Operation> Create(Operation operation);
    Task Update(Operation operation);
    Task Delete(Operation operation);
}