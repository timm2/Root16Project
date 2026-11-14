using System;
using System.Collections.Generic;

namespace IssueTrackerBackend.Models;

public partial class Status
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Issue> Issues { get; set; } = new List<Issue>();
}
