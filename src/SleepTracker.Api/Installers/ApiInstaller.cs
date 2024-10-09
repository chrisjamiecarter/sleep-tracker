namespace SleepTracker.Api.Installers;

/// <summary>
/// Registers dependencies and adds any required middleware for the API layer.
/// </summary>
public static class ApiInstaller
{
    public static IServiceCollection AddApi(this IServiceCollection services)
    {
        services.AddCors();
        
        services.AddAuthorization();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        return services;
    }

    public static WebApplication AddMiddleware(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        return app;
    }
}
