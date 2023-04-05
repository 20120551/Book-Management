using AuthServer.API.Business.Interfaces;
using AuthServer.API.Dto.Operation;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.API.Controller;

[ApiController]
[Route("api/[controller]")]
public class OperationController : ControllerBase
{
    private readonly IOperationService _operationService;

    public OperationController(IOperationService operationService)
    {
        _operationService = operationService;
    }

    //get all
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OperationReadDto>>> GetAll()
    {
        var operations = await _operationService.GetAll();
        return Ok(operations);
    }

    //get
    [HttpGet("{id}", Name = "GetOperationById")]
    public async Task<ActionResult<OperationReadDto>> Get([FromRoute] string id)
    {
        var operation = await _operationService.Get(id);
        return Ok(operation);
    }

    // create
    [HttpPost]
    public async Task<ActionResult<OperationReadDto>> Create([FromBody] OperationCreateDto opeartionRequest)
    {
        var operation = await _operationService.Create(opeartionRequest);
        return CreatedAtRoute("GetOperationById", new { Id = operation.Id }, operation);
    }

    // update
    [HttpPut("{id}")]
    public async Task<ActionResult> Update([FromRoute] string id, [FromBody] OperationUpdateDto operationRequest)
    {
        await _operationService.Update(id, operationRequest);
        return NoContent();
    }

    // delete
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] string id)
    {
        await _operationService.Delete(id);
        return NoContent();
    }

}