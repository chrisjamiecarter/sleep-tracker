using Asp.Versioning.Conventions;
using Microsoft.AspNetCore.Mvc;
using SleepTracker.Api.Contracts.V1;
using SleepTracker.Api.Services;

namespace SleepTracker.Api.Routes;

/// <summary>
/// Defines the API endpoints for managing sleep records. 
/// It provides methods to map routes for creating, retrieving, updating, and deleting sleep records 
/// and supports versioned APIs using Asp.Versioning.
/// </summary>
public static class SleepTracker
{
    #region Methods: Public

    public static WebApplication MapSleepTrackerEndpoints(this WebApplication app)
    {
        var apiVersionSet = app.NewApiVersionSet()
            .HasApiVersion(1)
            .ReportApiVersions()
            .Build();

        var builder = app.MapGroup("/api/v{version:apiVersion}/sleeps")
            .WithApiVersionSet(apiVersionSet);

        builder.MapGet("/", GetSleeps)
            .WithName(nameof(GetSleeps))
            .WithSummary("Get all sleep records.")
            .MapToApiVersion(1);

        return app;
    }

    #endregion
    #region Methods: Private

    private static async Task<IResult> GetSleeps([FromServices] ISleepRecordService service)
    {
        var entities = await service.ReturnAsync();
        return TypedResults.Ok(entities.Select(x => x.ToResponse()));
    }

    #endregion
}
