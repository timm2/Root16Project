-- Populate initial statuses
INSERT INTO Statuses (Name)
VALUES
    ('Open'),
    ('In Progress'),
    ('Blocked'),
    ('Completed'),
    ('Cancelled'),
    ('Closed');

-- Populate Users table
INSERT INTO Users (Name, Email)
VALUES
    ('John Smith', 'john.smith@example.com'),
    ('Sarah Johnson', 'sarah.johnson@example.com'),
    ('Mike Williams', 'mike.williams@example.com'),
    ('Emily Davis', 'emily.davis@example.com'),
    ('David Brown', 'david.brown@example.com');

-- Populate Issues table
INSERT INTO Issues (
    Title,
    Description,
    StatusId,
    AssignedUserId,
    CreatedAt
)
VALUES
    (
        'Fix login authentication bug',
        'Users are occasionally unable to log in with valid credentials.',
        1,
        1,
        '2026-11-01 09:00:00'
    ),
    (
        'Update user profile page',
        'Add support for editing user profile information.',
        2,
        2,
        '2026-11-02 10:30:00'
    ),
    (
        'Investigate API timeout',
        'The issues endpoint occasionally times out under heavy load.',
        3,
        3,
        '2026-11-03 14:00:00'
    ),
    (
        'Add pagination to issues endpoint',
        'Implement pagination to improve performance when retrieving issues.',
        1,
        NULL,
        '2026-11-04 11:15:00'
    ),
    (
        'Fix incorrect issue status',
        'Issues are sometimes displaying the wrong status in the frontend.',
        4,
        4,
        '2026-11-05 13:45:00'
    ),
    (
        'Improve database query performance',
        'Review and optimize queries used to retrieve issue information.',
        2,
        5,
        '2026-11-06 08:30:00'
    ),
    (
        'Add issue deletion endpoint',
        'Create a DELETE endpoint to remove issues.',
        1,
        NULL,
        '2026-11-07 15:00:00'
    );