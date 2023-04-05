using Microsoft.EntityFrameworkCore;
using AuthServer.API.DataAccess.Interfaces;
using AuthServer.API.Data;
using AuthServer.API.Models;

namespace AuthServer.API.DataAccess.Repo;

public class OperationRepo : IOperationRepo
{
    private readonly AppDbContext _context;

    public OperationRepo(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Operation> Create(Operation operation)
    {
        var result = await _context.Operations.AddAsync(operation);
        await _context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task Delete(Operation operation)
    {
        _context.Remove(operation);
        await _context.SaveChangesAsync();
    }

    public async Task<Operation?> Get(string id)
    {
        var operation = await _context.Operations.FindAsync(id);
        return operation;
    }

    public async Task<IEnumerable<Operation>> GetAll()
    {
        var operations = await _context.Operations.ToListAsync();
        return operations;
    }

    public async Task Update(Operation operation)
    {
        _context.Operations.Update(operation);
        await _context.SaveChangesAsync();
    }
}