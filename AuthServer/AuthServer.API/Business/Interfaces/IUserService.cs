using AuthServer.API.Dto.Token;
using AuthServer.API.Dto.User;

namespace AuthServer.API.Business.Interfaces;

public interface IUserService
{
    Task<UserReadDto> Register(UserCreateDto userRequest);
    Task<UserReadDto> Activate(UserActivatedDto userRequest, string? otp, string userId);
    Task<UserReadDto> VerifyOtp(UserActivatedDto userRequest, string? otp, string userId);
    Task ForgotPassword(UserForgotDto userRequest, string userId);
    Task ChangePassword(UserForgotDto userRequest, string userId);
    Task<(TokenResponse, UserReadDto)> Login(UserCreateDto userRequest);
    Task<IEnumerable<UserReadDto>> GetAll();
    Task<UserReadDto> Get(string id);

    Task<UserReadDto> GetByUsername(string username);
    Task<UserReadDto> Create(UserCreateDto userRequest);
    Task<UserReadDto> Update(UserUpdateDto userRequest, string userId);
    Task<UserReadDto> AddPhoneNumber(UserPhoneDto userRequest, string userId);
    Task<UserReadDto> VerifyPhoneOtp(UserActivatedDto userRequest, string? otp, string userId);
    Task Delete(string id);
    Task<UserReadDto> AddRole(string id, UserRoleDto role);
    Task<UserReadDto> DeleteRole(string id, UserRoleDto role);
    Task<(TokenResponse, UserReadDto)> RefreshToken(string userId, string refreshToken);
}