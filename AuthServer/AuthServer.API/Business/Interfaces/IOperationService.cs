using AuthServer.API.Dto.Operation;

namespace AuthServer.API.Business.Interfaces;
public interface IOperationService
{
    Task<IEnumerable<OperationReadDto>> GetAll();
    Task<OperationReadDto> Get(string id);
    Task<OperationReadDto> Create(OperationCreateDto operationRequest);
    Task Update(string id, OperationUpdateDto operationRequest);
    Task Delete(string id);
}