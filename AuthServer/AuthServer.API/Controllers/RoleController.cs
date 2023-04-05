using AuthServer.API.Business.Interfaces;
using AuthServer.API.Dto.Role;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.API.Controller;


[Route("api/[controller]")]
[ApiController]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    // get all 
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoleReadDto>>> GetAll()
    {
        var roles = await _roleService.GetAll();
        return Ok(roles);
    }

    // get
    [HttpGet("{slug}", Name = "GetRoleBySlug")]
    public async Task<ActionResult<RoleReadDto>> Get(string slug)
    {
        var role = await _roleService.GetRoleBySlug(slug);
        return Ok(role);
    }
    // create
    [HttpPost]
    public async Task<ActionResult<RoleReadDto>> Create([FromBody] RoleCreateDto roleRequest)
    {
        var role = await _roleService.Create(roleRequest);
        return CreatedAtRoute("GetRoleBySlug", new { Slug = role.Slug }, role);
    }
    // update
    [HttpPut("{id}")]
    public async Task<ActionResult> Update([FromRoute] string id, [FromBody] RoleUpdateDto role)
    {
        await _roleService.Update(id, role);
        return NoContent();
    }
    // remove 
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] string id)
    {
        await _roleService.Delete(id);
        return NoContent();
    }
    // add permission to role
    [HttpPut("{id}/add")]
    public async Task<ActionResult> AddPermission([FromRoute] string id, RolePermissionDto permission)
    {
        var role = await _roleService.AddPermission(id, permission);
        return CreatedAtRoute("GetRoleBySlug", new { Slug = role.Slug }, role);
    }

    // delete permission from role
    [HttpPut("{id}/delete")]
    public async Task<ActionResult> DeletePermission([FromRoute] string id, RolePermissionDto permission)
    {
        var role = await _roleService.DeletePermission(id, permission);
        return CreatedAtRoute("GetRoleBySlug", new { Slug = role.Slug }, role);
    }
}