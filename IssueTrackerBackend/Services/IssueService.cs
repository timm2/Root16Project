using IssueTrackerBackend.DatabaseContext;
using IssueTrackerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace IssueTrackerBackend.Services
{
    public class IssueService(IssueTrackerContext dbContext) : IIssueService
    {
        public async Task<bool> AssignIssueAsync(int issueId, int? assigneeId)
        {

            var issue = await dbContext.Issues.Where(i => i.Id == issueId).FirstOrDefaultAsync();
            if (issue == null)
            {
                return false;
            }

            if (assigneeId != null && !dbContext.Users.Any(i => i.Id == assigneeId))
            {
                return false;
            }
            issue.AssignedUserId = assigneeId;
            await dbContext.SaveChangesAsync();
            return true;
        }

        public async Task CreateIssueAsync(Issue issue)
        {
            await dbContext.AddAsync(issue);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<Issue>> GetIssuesAsync()
        {
            var issues = await dbContext.Issues
                .Include(i => i.Status)
                .Include(i => i.AssignedUser)
                .ToListAsync();
            return issues;
        }

        public async Task<bool> UpdateIssueStatusAsync(int issueId, int newStatusId)
        {
            var issue = await dbContext.Issues.FindAsync(issueId);
            if (issue == null)
            {
                return false;
            }

            issue.StatusId = newStatusId;
            await dbContext.SaveChangesAsync();
            return true;
        }
    }
}
