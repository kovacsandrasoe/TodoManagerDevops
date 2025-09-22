
using Microsoft.EntityFrameworkCore;
using TodoManager.Backend.Data;

namespace TodoManager.Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddControllers();
            builder.Services.AddDbContext<TodoDbContext>(opt =>
            {
                opt.UseSqlServer(builder.Configuration["db:conn"]);
            });
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();

            if (builder.Environment.IsProduction())
            {
                builder.WebHost.ConfigureKestrel(options =>
                {
                    options.ListenAnyIP(int.Parse(builder.Configuration["settings:port"] ?? "6500"));
                });
            }

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(t => t
                .WithOrigins(builder.Configuration["settings:frontend"] ?? "http://localhost:4200")
                .AllowAnyHeader()
                .AllowCredentials()
                .AllowAnyMethod());

            app.MapControllers();

            app.Run();
        }
    }
}
