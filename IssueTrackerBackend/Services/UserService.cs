using IssueTrackerBackend.DatabaseContext;
using IssueTrackerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace IssueTrackerBackend.Services
{
    public class UserService(IssueTrackerContext dbContext) : IUsersService
    {
        public async Task<List<User>> GetUsersAsync()
        {
            return await dbContext.Users.ToListAsync();
        }
    }
}
