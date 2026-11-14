using IssueTrackerBackend.DatabaseContext;
using IssueTrackerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace IssueTrackerBackend.Services
{
    public class StatusService(IssueTrackerContext dbContext) : IStatusService
    {
        public async Task CreateStatusAsync(Status status)
        {
            await dbContext.Statuses.AddAsync(status);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<Status>> GetStatusesAsync()
        {
            //var statuses = await dbContext.Statuses.ToListAsync();
            //return statuses;
            return await dbContext.Statuses
                .ToListAsync();
        }

        public async Task<bool> UpdateStatusNameAsync(int statusId, string newStatusName)
        {
            var status = await dbContext.Statuses.FindAsync(statusId);
            if (status == null)
            {
                return false;
            }

            status.Name = newStatusName;
            await dbContext.SaveChangesAsync();
            return true;
        }
    }
}
