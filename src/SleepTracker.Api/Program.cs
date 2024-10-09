using SleepTracker.Api.Installers;

namespace SleepTracker.Api;

/// <summary>
/// The entry point for the API.
/// This class is responsible for configuring and launching the application.
/// </summary>
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddApi();

        var app = builder.Build();
        app.AddMiddleware();
        app.Run();
    }
}
