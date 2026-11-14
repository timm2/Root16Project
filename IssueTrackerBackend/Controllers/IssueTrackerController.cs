using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IssueTrackerBackend.Controllers
{
    [Route("api/issues")]
    [ApiController]
    public class IssueTrackerController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetIssues()
        {
            var transactions = new[]
            {
                new { Id = 1, Name = "Groceries", Amount = 50.00 },
                new { Id = 2, Name = "Gas", Amount = 40.00 }
            };
            return Ok(transactions);
        }
    }
}
