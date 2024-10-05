
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using POS_System_BAL.Mapping;
using POS_System_BAL.Services.Customer;
using POS_System_BAL.Services.Goods;
using POS_System_BAL.Services.Supplier;
using POS_System_BAL.Services.User;
using POS_System_DAL;
using POS_System_DAL.Data;
using AutoMapper;
using POS_System_DAL.Authentication;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace POS_System
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IServiceCollection services = new ServiceCollection();

            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;
            services.AddCors();
            services.AddDistributedMemoryCache();
            services.AddSession();
            builder.Services.AddDbContext<OnlinePosContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAutoMapper(typeof(AutoMappers));

            builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            builder.Services.AddScoped<IUserServices, UserServices>();
            builder.Services.AddScoped<IGoodsServices, GoodsServices>();
            builder.Services.AddScoped<ISupplierServices, SupplierServices>();
            builder.Services.AddScoped<ICustomerServices, CustomerServices>();
            builder.Services.AddScoped<IAuthenticate, Authenticate>();


            builder.Services.AddCors(options => options
            .AddPolicy("CorsPolicy", builder => 
            {
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins("http://localhost:4200", "Other domain");
            }));


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            //app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
            app.UseAuthorization();

            app.MapControllers();


            

            app.Run();
        }
    }
}
