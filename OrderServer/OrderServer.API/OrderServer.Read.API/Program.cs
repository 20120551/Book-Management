using OrderServer.Application;
using OrderServer.Infrastructure;
using OrderServer.Shared;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddShared();
builder.Services.AddApplicationLayer();
builder.Services.AddReadInfrastructure();

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

app.UseHttpsRedirection();
app.UseShared();

app.UseAuthorization();


app.MapControllers();

app.Run();
