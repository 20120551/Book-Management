using AuthServer.API.Business.Interfaces;
using AuthServer.API.Business.Services;
using AuthServer.API.Configurations;
using AuthServer.API.Constants;
using AuthServer.API.Data;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.DataAccess.Repo;
using AuthServer.API.Extensions;
using AuthServer.API.Middlewares;
using AuthServer.API.Policies.Authentication.Handlers;
using AuthServer.API.Policies.Authentication.Interfaces;
using AuthServer.API.Policies.Authentication.Schemes;
using AuthServer.API.Policies.Authentication.Services;
using AuthServer.API.Subscribers.Background;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// add service and repo
// builder.Services.AddScoped<IPublicKeyStoreRepo, PublicKeyStoreJwkRepo>();
builder.Services.AddScoped<IPublicKeyStoreService, PublicKeyStoreService>();
builder.Services.AddScoped<IPublicKeyStoreRepo, PublicKeyStoreCustomRepo>();
builder.Services.AddScoped<IPrivateKeyStoreRepo, PrivateKeyStoreRepo>();
builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IRoleRepo, RoleRepo>();
builder.Services.AddScoped<IPermissionRepo, PermissionRepo>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IOperationRepo, OperationRepo>();
builder.Services.AddScoped<IOperationService, OperationService>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<ICacheService, CacheService>();

// add email service
builder.Services.Configure<MailConfig>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddScoped<IMailService, MailService>();

// add phone service
builder.Services.Configure<PhoneConfig>(builder.Configuration.GetSection("PhoneSettings"));
builder.Services.AddScoped<ISMSService, SMSService>();
// add http context
builder.Services.AddHttpContextAccessor();
// add auto mapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer"));
});

//add extension services
builder.Services.AddRedis(builder.Configuration);
builder.Services.AddMongoDb(builder.Configuration);
builder.Services.AddStreamingService();

//add background job services
builder.Services.AddHostedService<StreamingBackgroundService>();


//add session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(2);
});
// Add framework services.

//add authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = AuthenticationSchemeConstants.JWT_AUTHENTICATION_SCHEME;
    options.DefaultChallengeScheme = AuthenticationSchemeConstants.JWT_AUTHENTICATION_SCHEME;
})
.AddScheme<JwtAuthenticationOptions, JwtAuthenticationHandler>(
    AuthenticationSchemeConstants.JWT_AUTHENTICATION_SCHEME, options => { })
.AddScheme<KongAuthenticationOptions, KongAuthenticationHandler>(
    AuthenticationSchemeConstants.KONG_AUTHENTICATION_SCHEME, options => { });


builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("test", policy =>
    {
        policy.RequireClaim("permission", "read");
    });
});

//add middleware
builder.Services.AddTransient<ExceptionHandlingMiddleware>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.Migrate();
    }
}

// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSession();

// app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapControllers();

app.Run();
