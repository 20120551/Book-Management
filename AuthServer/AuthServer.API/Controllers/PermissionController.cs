using AuthServer.API.Business.Interfaces;
using AuthServer.API.Dto.Permission;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.API.Controller;

[Route("api/[controller]")]
[ApiController]
public class PermissionController : ControllerBase
{
    private readonly IPermissionService _permissionService;

    public PermissionController(IPermissionService permissionService)
    {
        _permissionService = permissionService;
    }

    //get all
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PermissionReadDto>>> GetAll()
    {
        var permissions = await _permissionService.GetAll();
        return Ok(permissions);
    }

    // get
    [HttpGet("{slug}", Name = "GetPermissionBySlug")]
    public async Task<ActionResult<PermissionReadDto>> Get([FromRoute] string slug)
    {
        var permission = await _permissionService.Get(slug);
        return Ok(permission);
    }

    // create
    [HttpPost]
    public async Task<ActionResult<PermissionReadDto>> Create([FromBody] PermissionCreateDto permissionRequest)
    {
        var permission = await _permissionService.Create(permissionRequest);
        return CreatedAtRoute("GetPermissionBySlug", new { Slug = permission.Slug }, permission);
    }

    // update
    [HttpPut("{id}")]
    public async Task<ActionResult> Update([FromRoute] string id, [FromBody] PermissionUpdateDto permission)
    {
        await _permissionService.Update(id, permission);
        return NoContent();
    }

    //delete
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] string id)
    {
        await _permissionService.Delete(id);
        return NoContent();
    }
}