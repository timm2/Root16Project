using IssueTrackerBackend.Models;

namespace IssueTrackerBackend.Services
{
    public interface IStatusService
    {
        public Task<List<Status>> GetStatusesAsync();
        public Task CreateStatusAsync(Status status);
        public Task<bool> UpdateStatusNameAsync(int statusId, string newStatusName);
    }
}
