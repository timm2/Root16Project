using IssueTrackerBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IssueTrackerBackend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController(IUsersService userService): ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await userService.GetUsersAsync();

            return Ok(users);
        }
    }
}
