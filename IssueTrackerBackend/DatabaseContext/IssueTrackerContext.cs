using System;
using System.Collections.Generic;
using IssueTrackerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace IssueTrackerBackend.DatabaseContext;

public partial class IssueTrackerContext : DbContext
{
    public IssueTrackerContext(DbContextOptions<IssueTrackerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Issue> Issues { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Issue>(entity =>
        {
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(d => d.AssignedUser).WithMany(p => p.Issues).HasForeignKey(d => d.AssignedUserId);

            entity.HasOne(d => d.Status).WithMany(p => p.Issues)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasIndex(e => e.Name, "IX_Statuses_Name").IsUnique();
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email, "IX_Users_Email").IsUnique();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
