using AuthServer.API.Business.Interfaces;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Dto.Operation;
using AuthServer.API.Exceptions.Handler;
using AuthServer.API.Models;
using AutoMapper;

namespace AuthServer.API.Business.Services;

public class OperationService : IOperationService
{
    private readonly IOperationRepo _operationRepo;
    private readonly IMapper _mapper;

    public OperationService(IOperationRepo operationRepo, IMapper mapper)
    {
        _operationRepo = operationRepo;
        _mapper = mapper;
    }
    public async Task<OperationReadDto> Create(OperationCreateDto operationRequest)
    {
        var operation = _mapper.Map<Operation>(operationRequest);
        var _operation = await _operationRepo.Create(operation);
        var operationResponse = _mapper.Map<OperationReadDto>(_operation);
        return operationResponse;
    }

    public async Task Delete(string id)
    {
        var operation = await _operationRepo.Get(id);
        if (operation == null)
        {
            throw new DomainBadRequestException("operation was not found");
        }

        await _operationRepo.Delete(operation);
    }

    public async Task<OperationReadDto> Get(string id)
    {
        var operation = await _operationRepo.Get(id);
        if (operation == null)
        {
            throw new DomainBadRequestException("operation was not found");
        }

        var operationResponse = _mapper.Map<OperationReadDto>(operation);
        return operationResponse;
    }

    public async Task<IEnumerable<OperationReadDto>> GetAll()
    {
        var operations = await _operationRepo.GetAll();
        var operationResponse = _mapper.Map<IEnumerable<OperationReadDto>>(operations);
        return operationResponse;
    }

    public async Task Update(string id, OperationUpdateDto operationRequest)
    {
        var operation = await _operationRepo.Get(id);
        if (operation == null)
        {
            throw new DomainBadRequestException("operation was not found");
        }

        _mapper.Map(operationRequest, operation);
        await _operationRepo.Update(operation);
    }
}