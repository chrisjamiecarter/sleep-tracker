using SleepTracker.Api.Data;
using SleepTracker.Api.Models;

namespace SleepTracker.Api.Services;

/// <summary>
/// Service class responsible for managing operations related to the <see cref="SleepRecord"/> entity.
/// Provides methods for creating, updating, deleting, and retrieving data by interacting with the
/// underlying data repositories through the Unit of Work pattern.
/// </summary>
public class SleepRecordService : ISleepRecordService
{
    #region Fields

    private readonly IUnitOfWork _unitOfWork;

    #endregion
    #region Constructors

    public SleepRecordService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    #endregion
    #region Methods

    public async Task<IEnumerable<SleepRecord>> ReturnAsync()
    {
        return await _unitOfWork.SleepRecord.ReturnAsync();
    }

    #endregion
}
