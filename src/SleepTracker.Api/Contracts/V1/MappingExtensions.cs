using SleepTracker.Api.Models;

namespace SleepTracker.Api.Contracts.V1;

/// <summary>
/// Provides extension methods for converting between request and response models and domain entities related to sleep records. 
/// </summary>
public static class MappingExtensions
{
    public static SleepRecordResponse ToResponse(this SleepRecord model)
    {
        return new SleepRecordResponse
        {
            Id = model.Id,
            Started = model.Started,
            Finished = model.Finished,
        };
    }
}
