namespace IssueTrackerBackend.RequestObjects
{
    public class CreateIssueDto
    {
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public int StatusId { get; set; }

        public int? AssignedUserId { get; set; }
    }
}
