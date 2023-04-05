using AuthServer.API.Business.Interfaces;
using AuthServer.API.Dto.Jwk;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.API.Controller;

[ApiController]
[Route("api/.well-knowns")]
public class PublicKeyController : ControllerBase
{
    private readonly IPublicKeyStoreService _publicKeyStoreService;

    public PublicKeyController(IPublicKeyStoreService publicKeyStoreService)
    {
        _publicKeyStoreService = publicKeyStoreService;
    }

    [HttpGet]
    public async Task<ActionResult<object>> GetAll()
    {
        var jwks = await _publicKeyStoreService.GetAll();
        return Ok(new { keys = jwks });
    }

    [HttpGet("{kid}")]
    public async Task<ActionResult<JwkReadDto>> Get([FromRoute] string kid)
    {
        var jwk = await _publicKeyStoreService.GetById(kid);
        return Ok(jwk);
    }

    [HttpDelete("{kid}")]
    public async Task<ActionResult> Delete([FromRoute] string kid)
    {
        await _publicKeyStoreService.Delete(kid);
        return NoContent();
    }
}