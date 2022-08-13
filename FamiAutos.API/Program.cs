using FamiAutos.API.Data;
using FamiAutos.API.Data.Repositories;
using FamiAutos.API.Helpers;
using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;

var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddControllers();

    // NLog: Setup NLog for Dependency injection
    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    builder.Services.AddDbContext<DataContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DBFA"));
    });
    builder.Services.AddScoped<IAccountingRepository,AccountingRepository>()
                    .AddScoped<IMapperHelper,MapperHelper>();
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "MyCors", builder =>
        {
            builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost") 
            .AllowAnyHeader().AllowAnyMethod();
        });
    }
    );
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    app.UseCors("MyCors");
    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex){
    logger.Error(ex, "Stopped program because of exception");
    throw;
}
finally
{
    NLog.LogManager.Shutdown();
}
