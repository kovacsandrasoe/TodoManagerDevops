using Microsoft.EntityFrameworkCore;
using TodoManager.Backend.Models;

namespace TodoManager.Backend.Data
{
    public class TodoDbContext : DbContext
    {
        public DbSet<Todo> Todos { get; set; }

        public TodoDbContext(DbContextOptions<TodoDbContext> ctx) : base(ctx) 
        {
            
        }
    }
}
