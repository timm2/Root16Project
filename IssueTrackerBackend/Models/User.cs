using System;
using System.Collections.Generic;

namespace IssueTrackerBackend.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Issue> Issues { get; set; } = new List<Issue>();
}
