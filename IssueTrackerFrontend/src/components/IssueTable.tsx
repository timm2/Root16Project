
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Box,
    Button
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import type { Issue } from "../types/Issue";
import { updateIssueStatus, getIssues, updateIssueAssignedUser, createIssue, createStatus } from "../services/api";
import { useState } from "react";
import type { Status } from "../types/Status";
import type { User } from "../types/User";
import AddIssueDialog from "./AddIssueDialog";
import AddStatusDialog from "./AddStatusDialog";

interface IssueTableProps {
    issues: Issue[];
    statuses: Status[];
    users: User[];
}

function IssueTable({ issues, statuses, users }: IssueTableProps) {

    const [currentIssues, setIssues] = useState<Issue[]>(issues);
    const [currentStatuses, setStatuses] = useState<Status[]>(statuses);
    const [openAddIssue, setOpenAddIssue] = useState(false);
    const [openAddStatus, setOpenAddStatus] = useState(false);

    const handleStatusChange = async (
    issueId: number,
    statusId: number
    ) => {
        try {
            await updateIssueStatus(issueId, statusId);

            const updatedIssues = await getIssues();
            setIssues(updatedIssues);
        } catch (error) {
            console.error("Failed to update issue status:", error);
        }
    };

    const handleAssigneeChange = async (
        issueId: number,
        assigneeId: number | null
    ) => {
        try {
            await updateIssueAssignedUser(issueId, assigneeId);

            const updatedIssues = await getIssues();
            setIssues(updatedIssues);
        } catch (error) {
            console.error("Failed to update issue assignee:", error);
        }
    };

    const handleAddIssue = async (issue: {
        title: string;
        description: string;
        statusId: number;
        assignedUserId: number | null;
    }) => {
        await createIssue(issue);

        const updatedIssues = await getIssues();
        setIssues(updatedIssues);
    };

    const handleAddStatus = async (statusName: string) => {
        const status = await createStatus(statusName);
        setStatuses((current) => [...current, status]);
    };

    return (
        <>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Title</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Assigned User</strong></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {currentIssues.map((issue) => (
                        <TableRow key={issue.id}>
                            <TableCell>{issue.title}</TableCell>

                            <TableCell>
                                {issue.description ?? "No description"}
                            </TableCell>

                            <TableCell>
                                 <Select
                                    value={issue.statusId}
                                    size="small"
                                    onChange={(event) =>
                                        handleStatusChange(
                                            issue.id,
                                            Number(event.target.value)
                                        )
                                    }
                                >
                                    {currentStatuses.map((status) => (
                                        <MenuItem key={status.id} value={status.id}>
                                            {status.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>

                            <TableCell>
                                <Select
                                    value={issue.assignedUser?.id ?? -1}
                                    size="small"
                                    onChange={(event) =>
                                        handleAssigneeChange(
                                            issue.id,
                                            event.target.value === -1 ? null : Number(event.target.value)
                                        )
                                    }
                                >
                                    <MenuItem value={-1}>Unassigned</MenuItem>
                                    {users.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}

                    {issues.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No issues found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddStatus(true)}
            >
                Add Status
            </Button>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddIssue(true)}
            >
                Add Issue
            </Button>
        </Box>
        <AddIssueDialog
            open={openAddIssue}
            statuses={currentStatuses}
            users={users}
            onClose={() => setOpenAddIssue(false)}
            onSubmit={handleAddIssue}
        />
        <AddStatusDialog
            open={openAddStatus}
            onClose={() => setOpenAddStatus(false)}
            onSubmit={handleAddStatus}
        />
        </>
    );
}

export default IssueTable;
