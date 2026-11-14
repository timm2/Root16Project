using IssueTrackerBackend.DatabaseContext;
using IssueTrackerBackend.Models;
using IssueTrackerBackend.RequestObjects.IssueDtos;
using IssueTrackerBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IssueTrackerBackend.Controllers
{
    [Route("api/issues")]
    [ApiController]
    public class IssueController(IIssueService issueService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetIssues()
        {
            var issues = await issueService.GetIssuesAsync();
            return Ok(issues);
        }

        [HttpPost]
        public async Task<IActionResult> CreateIssue(CreateIssueDto request)
        {
            var issue = new Issue
            {
                Title = request.Title,
                Description = request.Description,
                StatusId = request.StatusId,
                AssignedUserId = request.AssignedUserId,
                CreatedAt = DateTime.UtcNow.ToString("O")
            };

            await issueService.CreateIssueAsync(issue);

            return StatusCode(201, issue);
        }

        [HttpPut("{id}/update-status")]
        public async Task<IActionResult> UpdateIssueStatus(int id, [FromBody] UpdateIssueStatusDto request)
        {
            var success = await issueService.UpdateIssueStatusAsync(id, request.StatusId);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut("{id}/update-assignee")]
        public async Task<IActionResult> AssignIssue(int id, [FromBody] AssignIssueDto request)
        {
            var success = await issueService.AssignIssueAsync(id, request.AssigneeId);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
