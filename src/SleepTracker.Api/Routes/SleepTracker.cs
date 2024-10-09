using Asp.Versioning.Conventions;
using Microsoft.AspNetCore.Mvc;
using SleepTracker.Api.Contracts.V1;
using SleepTracker.Api.Filters;
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

        builder.MapGet("/{id}", GetSleep)
            .WithName(nameof(GetSleep))
            .WithSummary("Get a sleep record by ID.")
            .MapToApiVersion(1);


        builder.MapPost("/", CreateSleep)
            .WithName(nameof(CreateSleep))
            .WithSummary("Create a new sleep record.")
            .MapToApiVersion(1)
            .WithRequestValidation<SleepRecordRequest>();

        return app;
    }

    #endregion
    #region Methods: Private

    private static async Task<IResult> CreateSleep([FromBody] SleepRecordRequest request, [FromServices] ISleepRecordService service)
    {
        var model = request.ToModel();

        var created = await service.CreateAsync(model);

        return created
        ? TypedResults.CreatedAtRoute(model.ToResponse(), nameof(GetSleep), new { id = model.Id })
        : TypedResults.BadRequest(new { error = "Unable to create sleep." });
    }

    private static async Task<IResult> GetSleep([FromRoute] Guid id, [FromServices] ISleepRecordService service)
    {
        var entity = await service.ReturnAsync(id);

        return entity is null
            ? TypedResults.NotFound()
            : TypedResults.Ok(entity.ToResponse());
    }

    private static async Task<IResult> GetSleeps([FromServices] ISleepRecordService service)
    {
        var entities = await service.ReturnAsync();
        return TypedResults.Ok(entities.Select(x => x.ToResponse()));
    }

    #endregion
}
