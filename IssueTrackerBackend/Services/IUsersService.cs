using IssueTrackerBackend.Models;

namespace IssueTrackerBackend.Services
{
    public interface IUsersService
    {
        public Task<List<User>> GetUsersAsync();
    }
}
