import axios from "axios";
import type { Issue } from "../types/Issue";
import type { Status } from "../types/Status";

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
