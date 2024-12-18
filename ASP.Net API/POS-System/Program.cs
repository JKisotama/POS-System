
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
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;
using Microsoft.Extensions.DependencyInjection;
using POS_System_BAL.Services.POS;
using POS_System_BAL.Services.SaleReport;

namespace POS_System
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IServiceCollection services = new ServiceCollection();


            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            var cloudinarySettings = configuration.GetSection("CloudinarySettings").Get<CloudinarySettings>();
            if (cloudinarySettings == null)
            {
                throw new ArgumentException("CloudinarySettings section is missing from appsettings.json");
            }

            var account = new Account(
            cloudinarySettings.CloudName,
            cloudinarySettings.ApiKey,
            cloudinarySettings.ApiSecret
            );

            Cloudinary cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true;

            services.AddCors();
            services.AddDistributedMemoryCache();
            services.AddSession();
            builder.Services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; // Prevents infinite loop
                options.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None; // Keeps references
            });
            
            builder.Services.AddDbContext<OnlinePosContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAutoMapper(typeof(AutoMappers));

            builder.Services.AddSingleton(cloudinary);

            builder.Services.AddScoped<IUserServices, UserServices>();
            builder.Services.AddScoped<IGoodsServices, GoodsServices>();
            builder.Services.AddScoped<ISupplierServices, SupplierServices>();
            builder.Services.AddScoped<ICustomerServices, CustomerServices>();
            builder.Services.AddScoped<IPosServices, PosServices>();
            builder.Services.AddScoped<IAuthenticate, Authenticate>();
            builder.Services.AddScoped<ISaleServices, SaleServices>();


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseAuthorization();

            app.MapControllers();




            app.Run();
        }
    }
}