using Microsoft.EntityFrameworkCore;
using SleepTracker.Api.Models;

namespace SleepTracker.Api.Data;

/// <summary>
/// Provides repository operations for managing the <see cref="SleepRecord"/> entity.
/// This class implements the <see cref="ISleepTrackerRepository"/> interface, offering 
/// methods to perform CRUD operations against the database using Entity Framework Core.
/// </summary>
public class SleepTrackerRepository : ISleepTrackerRepository
{
    #region Fields

    private readonly SleepTrackerDataContext _dataContext;

    #endregion
    #region Constructors

    public SleepTrackerRepository(SleepTrackerDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    #endregion
    #region Methods

    public async Task<IEnumerable<SleepRecord>> ReturnAsync()
    {
        return await _dataContext.SleepRecord.OrderBy(o => o.Started).ToListAsync();
    }

    #endregion
}
