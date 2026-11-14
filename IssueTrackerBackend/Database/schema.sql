--Drop tables if they already exist
DROP TABLE IF EXISTS Issues;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Statuses;


-- Create Statuses table
CREATE TABLE Statuses (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL UNIQUE
);

-- Create Users table
CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE
);

-- Create Issues table
CREATE TABLE Issues (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Description TEXT,
    StatusId INTEGER NOT NULL,
    AssignedUserId INTEGER,
    CreatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (StatusId) REFERENCES Statuses(Id),
    FOREIGN KEY (AssignedUserId) REFERENCES Users(Id)
);

