
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using POS_System_BAL.Services.Goods;
using POS_System_BAL.Services.User;
using POS_System_DAL.Data;
using POS_System_DAL.Repository;
using POS_System_DAL.Repository.Goods;
using POS_System_DAL.Repository.User;

namespace POS_System
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IServiceCollection services = new ServiceCollection();

            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            services.AddDistributedMemoryCache();
            services.AddSession();

            builder.Services.AddDbContext<OnlinePosContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserServices, UserServices>();
            builder.Services.AddScoped<IGoodsRepository, GoodsRepository>();
            builder.Services.AddScoped<IGoodsServices, GoodsServices>();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
