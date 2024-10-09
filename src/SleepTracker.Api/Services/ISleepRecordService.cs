using SleepTracker.Api.Models;

namespace SleepTracker.Api.Services;

/// <summary>
/// Defines the contract for a service that manages <see cref="SleepRecord"/> entities.
/// </summary>
public interface ISleepRecordService
{
    Task<IEnumerable<SleepRecord>> ReturnAsync();
}