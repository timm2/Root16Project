
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
} from "@mui/material";

import type { Issue } from "../types/Issue";
import { updateIssueStatus, getIssues } from "../services/api";
import { useState } from "react";
import type { Status } from "../types/Status";

interface IssueTableProps {
    issues: Issue[];
    statuses: Status[];
}

function IssueTable({ issues, statuses }: IssueTableProps) {

    const [currentIssues, setIssues] = useState<Issue[]>(issues);

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

    return (
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
                                    {statuses.map((status) => (
                                        <MenuItem key={status.id} value={status.id}>
                                            {status.name}
                                        </MenuItem>
                                    ))}
    </Select>
                            </TableCell>

                            <TableCell>
                                {issue.assignedUser?.name ?? "Unassigned"}
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
    );
}

export default IssueTable;
