using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoManager.Backend.Data;
using TodoManager.Backend.Models;

namespace TodoManager.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        TodoDbContext ctx;
        public TodoController(TodoDbContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] TodoCreateDto dto)
        {
            try
            {
                var newTodo = new Todo()
                {
                    Text = dto.Text
                };
                await this.ctx.Todos.AddAsync(newTodo);
                await this.ctx.SaveChangesAsync();
                return Ok(newTodo);
            }
            catch (Exception ex)
            {
                return BadRequest(new Error(ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(string id)
        {
            try
            {
                var todoToDelete = await this.ctx.Todos.FirstAsync(t => t.Id == id);
                this.ctx.Todos.Remove(todoToDelete);
                await this.ctx.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new Error(ex.Message));
            }
        }

        [HttpGet]
        public async Task<List<TodoViewDto>> GetTodos()
        {
            return await ctx.Todos.AsNoTracking().Select(z => new TodoViewDto()
            {
                Id = z.Id,
                CreatedAt = z.CreatedAt,
                Text = z.Text
            }).ToListAsync();
        }
    }
}
