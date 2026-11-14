
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from "@mui/material";

import type { Issue } from "../types/Issue";

interface IssueTableProps {
    issues: Issue[];
}

function IssueTable({ issues }: IssueTableProps) {

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "open":
                return "info";
            case "in progress":
                return "warning";
            case "blocked":
                return "error";
            case "completed":
                return "success";
            default:
                return "default";
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
                    {issues.map((issue) => (
                        <TableRow key={issue.id}>
                            <TableCell>{issue.title}</TableCell>

                            <TableCell>
                                {issue.description ?? "No description"}
                            </TableCell>

                            <TableCell>
                                <Chip
                                    label={issue.status?.name ?? "Unknown"}
                                    color={getStatusColor(
                                        issue.status?.name ?? ""
                                    )}
                                    size="small"
                                />
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
