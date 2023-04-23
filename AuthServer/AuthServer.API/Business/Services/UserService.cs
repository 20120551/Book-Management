using AuthServer.API.Business.Interfaces;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Dto.Event;
using AuthServer.API.Dto.Token;
using AuthServer.API.Dto.User;
using AuthServer.API.Exceptions.Handler;
using AuthServer.API.Models;
using AuthServer.API.Policies.Authentication.Interfaces;
using AuthServer.API.Publisher.Interfaces;
using AuthServer.API.Utils;
using AutoMapper;
using RabbitMQ.Client;

namespace AuthServer.API.Business.Services;

public class UserService : IUserService
{
    private readonly IUserRepo _userRepo;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IPrivateKeyStoreRepo _pkStoreRepo;
    private readonly ITokenGenerator _tokenGenerator;
    private readonly IRoleRepo _roleRepo;
    private readonly IPublicKeyStoreRepo _publicKeyStoreJwkRepo;
    private readonly IMapper _mapper;
    private readonly IPublisher _publisher;

    public UserService(
        IUserRepo userRepo,
        IPasswordHasher passwordHasher,
        IPrivateKeyStoreRepo pkStoreRepo,
        ITokenGenerator tokenGenerator,
        IRoleRepo roleRepo,
        IPublicKeyStoreRepo publicKeyStoreJwkRepo,
        IMapper mapper,
        IPublisher publisher)
    {
        _userRepo = userRepo;
        _passwordHasher = passwordHasher;
        _pkStoreRepo = pkStoreRepo;
        _tokenGenerator = tokenGenerator;
        _roleRepo = roleRepo;
        _publicKeyStoreJwkRepo = publicKeyStoreJwkRepo;
        _mapper = mapper;
        _publisher = publisher;
    }

    public async Task<UserReadDto> Activate(UserActivatedDto userRequest, string? otp, string userId)
    {
        //validate otp
        var user = await ValidateOTP(userRequest, otp, userId);

        //set isactivatedaccount to true
        user.IsActiveAccount = true;
        await _userRepo.Update(user);

        var userResponse = _mapper.Map<UserReadDto>(user);

        // publish event
        var @event = new UserCreated(Guid.Parse(user.Id), user.Username, user.Firstname!, user.Lastname!);
        await _publisher.PublishAsync("user", ExchangeType.Topic, "user.created", @event);
        return userResponse;
    }

    public async Task<UserReadDto> AddRole(string id, UserRoleDto role)
    {
        var user = await _userRepo.GetUserById(id);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }

        var _role = await _roleRepo.GetRoleById(role.RoleId);
        if (role == null)
        {
            throw new DomainBadRequestException("role was not found");
        }
        var isExist = _userRepo.IsExistRole(user, _role!);
        if (isExist)
        {
            throw new DomainConflictException("role has existed on that user");
        }

        await _userRepo.AddRole(user, _role!);
        var userResponse = _mapper.Map<UserReadDto>(user);
        return userResponse;
    }

    public async Task ForgotPassword(UserForgotDto userRequest, string userId)
    {
        var user = await _userRepo.GetUserById(userId);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }
        // change password
        var encryptPassword = _passwordHasher.Hash(userRequest.NewPassword!);
        user.Password = encryptPassword;

        //update password
        await _userRepo.Update(user);
    }

    public async Task ChangePassword(UserForgotDto userRequest, string userId)
    {
        var user = await _userRepo.GetUserById(userId);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }
        // check password
        var isMatch = _passwordHasher.Verify(user.Password, userRequest.OldPassword!);
        if (!isMatch)
        {
            throw new DomainBadRequestException("password is not matching");
        }
        // change password
        var encryptPassword = _passwordHasher.Hash(userRequest.NewPassword!);
        user.Password = encryptPassword;

        //update password
        await _userRepo.Update(user);
    }

    public async Task<UserReadDto> Create(UserCreateDto userRequest)
    {
        var user = _mapper.Map<User>(userRequest);
        var (username, password) = user;

        // Kiểm tra username đã tồn tại chưa
        var _user = await _userRepo.GetUserByUsername(username);
        if (_user != null)
        {
            throw new DomainBadRequestException("Username has existed");
        }
        // Mã hóa mật khẩu
        var hashPassword = _passwordHasher.Hash(password);
        // Tạo key pair
        var (publicKey, privateKey) = KeyPairGenerator.Generate();
        // store public key into jwks

        var kid = RandomString.GenerateIdWithPrefix("Kid");
        // save public key 
        await _publicKeyStoreJwkRepo.Create(kid, publicKey);

        //attach kid to user for saving
        user.Kid = kid;
        user.Password = hashPassword;

        //check role on userRequest
        var roles = new List<Role>();
        foreach (var role in userRequest.Roles!)
        {
            var _role = await _roleRepo.GetRoleById(role.RoleId);
            if (_role == null)
            {
                throw new DomainConflictException("Role was not found");
            }
            roles.Add(_role);
        };

        //assign role for user
        user.Roles = roles;
        _user = await _userRepo.Create(user);
        // Lưu private key vào 1 nơi nào đó ...
        var pk = new PrivateKeyStore()
        {
            PrivateKey = privateKey,
            Id = user.Id
        };
        await _pkStoreRepo.Create(pk);
        // trả kết quả về cho người dùng

        //mapper
        var userResponse = _mapper.Map<UserReadDto>(_user);
        return userResponse;
    }

    public async Task Delete(string id)
    {
        var user = await _userRepo.GetUserById(id);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }
        await _userRepo.Delete(user);


        // publish event
        var @event = new UserDeleted(Guid.Parse(user.Id));
        await _publisher.PublishAsync("user", ExchangeType.Topic, "user.deleted", @event);
    }

    public async Task<UserReadDto> DeleteRole(string id, UserRoleDto role)
    {
        var user = await _userRepo.GetUserById(id);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }

        var _role = await _roleRepo.GetRoleById(role.RoleId);
        if (role == null)
        {
            throw new DomainBadRequestException("role was not found");
        }
        var isExist = _userRepo.IsExistRole(user, _role!);
        if (isExist)
        {
            throw new DomainConflictException("role has existed on that user");
        }

        await _userRepo.DeleteRole(user, _role!);
        var userResponse = _mapper.Map<UserReadDto>(user);
        return userResponse;
    }

    public async Task<UserReadDto> Get(string id)
    {
        var user = await _userRepo.GetUserById(id);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }
        var userResponse = _mapper.Map<UserReadDto>(user);
        return userResponse;
    }

    public async Task<IEnumerable<UserReadDto>> GetAll()
    {
        var users = await _userRepo.GetAll();
        var userResponse = _mapper.Map<IEnumerable<UserReadDto>>(users);
        return userResponse;
    }

    public async Task<UserReadDto> GetByUsername(string username)
    {
        var user = await _userRepo.GetUserByUsername(username);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }

        var userResponse = _mapper.Map<UserReadDto>(user);
        return userResponse;
    }

    public async Task<(TokenResponse, UserReadDto)> Login(UserCreateDto userRequest)
    {
        var user = _mapper.Map<User>(userRequest);
        var (username, password) = user;
        // kiem tra username
        var _user = await _userRepo.GetUserByUsername(username);
        if (_user == null)
        {
            throw new DomainBadRequestException("Username was not correct");
        }
        // kiem tra password
        var isCorrect = _passwordHasher.Verify(_user.Password, password);
        if (!isCorrect)
        {
            throw new DomainBadRequestException("Password was not correct");
        }
        // get private key
        var pk = await _pkStoreRepo.GetPKByUserId(_user.Id);

        (string accessToken, string refreshToken) = _tokenGenerator.Sign(_user, pk.PrivateKey);
        // response
        var token = new TokenResponse() { AccessToken = accessToken, RefreshToken = refreshToken };

        // map to user read dto
        var userResponse = _mapper.Map<UserReadDto>(_user);
        return (token, userResponse);
    }

    public async Task<UserReadDto> Register(UserCreateDto userRequest)
    {
        var user = _mapper.Map<User>(userRequest);
        var (username, password) = user;
        // Kiểm tra username đã tồn tại chưa
        var _user = await _userRepo.GetUserByUsername(username);
        if (_user != null)
        {
            throw new DomainBadRequestException("Username has existed");
        }
        // Mã hóa mật khẩu
        var hashPassword = _passwordHasher.Hash(password);
        // Tạo key pair
        var (publicKey, privateKey) = KeyPairGenerator.Generate();
        // store public key into jwks

        var kid = RandomString.GenerateIdWithPrefix("Kid");
        // save public key 
        await _publicKeyStoreJwkRepo.Create(kid, publicKey);
        //attach kid to user for saving
        user.Kid = kid;
        user.Password = hashPassword;

        _user = await _userRepo.Create(user);
        // Lưu private key vào 1 nơi nào đó ...
        var pk = new PrivateKeyStore()
        {
            PrivateKey = privateKey,
            Id = user.Id
        };

        await _pkStoreRepo.Create(pk);
        // trả kết quả về cho người dùng

        //mapper
        var userResponse = _mapper.Map<UserReadDto>(_user);
        return userResponse;
    }

    public async Task<UserReadDto> VerifyOtp(UserActivatedDto userRequest, string? otp, string userId)
    {
        var user = await ValidateOTP(userRequest, otp, userId);
        var userResponse = _mapper.Map<UserReadDto>(user);
        return userResponse;
    }

    private async Task<User> ValidateOTP(UserActivatedDto userRequest, string? otp, string userId)
    {
        if (string.IsNullOrEmpty(otp))
        {
            throw new DomainConflictException("Otp is unvalid");
        }
        // compare otp
        if (userRequest.OTP != otp)
        {
            throw new DomainBadRequestException("Otp is not correct");
        }

        var user = await _userRepo.GetUserById(userId);
        if (user == null)
        {
            throw new DomainConflictException("Cannot found that user on system");
        }

        return user;
    }

    public async Task<UserReadDto> Update(UserUpdateDto userRequest, string userId)
    {
        var user = await _userRepo.GetUserById(userId);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }

        _mapper.Map<UserUpdateDto, User>(userRequest, user);
        await _userRepo.Update(user);
        var userResponse = _mapper.Map<UserReadDto>(user);

        // publish event
        var @event = new UserUpdated(Guid.Parse(user.Id), user.Firstname!, user.Lastname!);
        await _publisher.PublishAsync("user", ExchangeType.Topic, "user.updated", @event);
        return userResponse;
    }

    public async Task<UserReadDto> AddPhoneNumber(UserPhoneDto userRequest, string userId)
    {
        var user = await _userRepo.GetUserById(userId);
        if (user == null)
        {
            throw new DomainBadRequestException("user was not found");
        }
        user.PhoneNumber = userRequest.PhoneNumber;
        user.IsActivePhoneNumber = false;
        await _userRepo.Update(user);

        var userResponse = _mapper.Map<UserReadDto>(user);
        return userResponse;
    }

    public async Task<UserReadDto> VerifyPhoneOtp(UserActivatedDto userRequest, string? otp, string userId)
    {
        var user = await ValidateOTP(userRequest, otp, userId);
        user.IsActivePhoneNumber = true;
        await _userRepo.Update(user);
        var userResponse = _mapper.Map<UserReadDto>(user);
        return userResponse;
    }

    public async Task<(TokenResponse, UserReadDto)> RefreshToken(string userId, string refreshToken)
    {
        var decode = await _tokenGenerator.Verify(refreshToken);
        if ((string)decode["id"] != userId)
        {
            throw new DomainBadRequestException("token was not responsibly for that user");
        }

        //get private key and user info
        var pk = await _pkStoreRepo.GetPKByUserId(userId);
        var user = await _userRepo.GetUserById(userId);

        var (accessToken, _refreshToken) = _tokenGenerator.Sign(user!, pk.PrivateKey);
        var token = new TokenResponse()
        {
            RefreshToken = _refreshToken,
            AccessToken = accessToken
        };

        var userResponse = _mapper.Map<UserReadDto>(user);
        return (token, userResponse);
    }
}