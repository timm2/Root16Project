using System;
using System.Collections.Generic;

namespace IssueTrackerBackend.Models;

public partial class Issue
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int StatusId { get; set; }

    public int? AssignedUserId { get; set; }

    public string CreatedAt { get; set; } = null!;

    public virtual User? AssignedUser { get; set; }

    public virtual Status Status { get; set; } = null!;
}
