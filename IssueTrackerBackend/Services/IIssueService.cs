using IssueTrackerBackend.Models;

namespace IssueTrackerBackend.Services
{
    public interface IIssueService
    {
        public Task<List<Issue>> GetIssuesAsync();
        public Task CreateIssueAsync(Issue issue);
        public Task<bool> UpdateIssueStatusAsync(int issueId, int newStatusId);
        public Task<bool> AssignIssueAsync(int issueId, int assigneeId);
    }
}
