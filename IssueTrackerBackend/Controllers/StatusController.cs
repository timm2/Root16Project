using IssueTrackerBackend.Models;
using IssueTrackerBackend.RequestObjects.StatusDtos;
using IssueTrackerBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace IssueTrackerBackend.Controllers
{
    [Route("api/statuses")]
    [ApiController]
    public class StatusController(IStatusService statusService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetStatuses()
        {
            var statuses = await statusService.GetStatusesAsync();

            return Ok(statuses.Select(status => new
            {
                status.Id,
                status.Name,
                Issues = status.Issues.Select(issue => new
                {
                    issue.Id,
                    issue.Title,
                    issue.Description,
                    issue.StatusId,
                    issue.AssignedUserId,
                    issue.CreatedAt
                })
            }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateStatus(CreateStatusDto request)
        {
            var status = new Status
            {
                Name = request.StatusName
            };
            await statusService.CreateStatusAsync(status);
            return StatusCode(201, status);
        }

        [HttpPut("{id}/update-status-name")]
        public async Task<IActionResult> UpdateStatusName(int id, [FromBody] UpdateStatusDto request)
        {
            var success = await statusService.UpdateStatusNameAsync(id, request.newStatusName);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }   
    }
}
