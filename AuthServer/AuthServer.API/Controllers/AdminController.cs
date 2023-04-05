using AuthServer.API.Business.Interfaces;
using AuthServer.API.Dto.User;
using AuthServer.API.Publisher.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.API.Controller;

[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IStreamingPublisher _streamingPublisher;

    public AdminController(IUserService userService,
                           IStreamingPublisher streamingPublisher)
    {
        _userService = userService;
        _streamingPublisher = streamingPublisher;
    }

    [HttpGet("users", Name = "GetAllUsers")]
    // [Authorize(AuthenticationSchemes = "JwtAuthenticationScheme")]
    public async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll()
    {
        var users = await _userService.GetAll();
        return Ok(users);
    }

    [HttpGet("users/{id}", Name = "GetUserById")]
    public async Task<ActionResult<UserReadDto>> Get([FromRoute] string id)
    {
        var user = await _userService.Get(id);
        return Ok(user);
    }


    [HttpPost("users/create")]
    public async Task<ActionResult<UserReadDto>> Create([FromBody] UserCreateDto userRequest)
    {
        var user = await _userService.Create(userRequest);
        return CreatedAtRoute("GetUserById", new { id = user.Id }, user);
    }

    [HttpDelete("users/delete/{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        await _userService.Delete(id);
        return NoContent();
    }

    [HttpPut("role/add/{id}")]
    public async Task<ActionResult<UserReadDto>> AddRole([FromRoute] string id, UserRoleDto role)
    {
        var user = await _userService.AddRole(id, role);
        return CreatedAtRoute("GetUserById", new { id = user.Id }, user);
    }

    [HttpPut("role/delete/{id}")]
    public async Task<ActionResult<UserReadDto>> DeleteRole([FromRoute] string id, UserRoleDto role)
    {
        var user = await _userService.DeleteRole(id, role);
        return CreatedAtRoute("GetUserById", new { id = user.Id }, user);
    }
}