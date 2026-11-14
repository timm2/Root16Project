import type { Status } from "./Status";
import type { User } from "./User";

export interface Issue {
    id: number;
    title: string;
    description: string | null;
    statusId: number;
    assignedUserId: number | null;
    createdAt: string;
    status?: Status;
    assignedUser?: User | null;
}