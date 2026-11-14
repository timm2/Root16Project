import axios from "axios";
import type { Issue } from "../types/Issue";
import type { Status } from "../types/Status";
import type { User } from "../types/User";

const api = axios.create({
    baseURL: "https://localhost:7274/api"
});

export const getIssues = async (): Promise<Issue[]> => {
    const response = await api.get<Issue[]>("/issues");
    return response.data;
};

export const getStatuses = async (): Promise<Status[]> => {
    const response = await api.get<Status[]>("/statuses");
    return response.data;
};

export const updateIssueStatus = async (
    issueId: number,
    statusId: number
) => {
    await api.put(
        `/issues/${issueId}/update-status`,
        { statusId }
    );
};

export const createIssue = async (issue: {
    title: string;
    description: string;
    statusId: number;
    assignedUserId: number | null;
}) => {
    await api.post("/issues", issue);
};

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
}
export const updateIssueAssignedUser = async (
    issueId: number,
    assigneeId: number | null
) => {
    await api.put(
        `/issues/${issueId}/update-assignee`,
        { assigneeId }
    );
}
