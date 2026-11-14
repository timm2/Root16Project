namespace IssueTrackerBackend.RequestObjects.IssueDtos
{
    public class CreateIssueDto
    {
        public required string Title { get; set; }

        public string? Description { get; set; }

        public int StatusId { get; set; }

        public int? AssignedUserId { get; set; }
    }
}
