
import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from "@mui/material";

import type { Status } from "../types/Status";
import type { User } from "../types/User";

interface AddIssueDialogProps {
    open: boolean;
    statuses: Status[];
    users: User[];
    onClose: () => void;
    onSubmit: (issue: {
        title: string;
        description: string;
        statusId: number;
        assignedUserId: number | null;
    }) => Promise<void>;
}

export default function AddIssueDialog({
    open,
    statuses,
    users,
    onClose,
    onSubmit
}: AddIssueDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [statusId, setStatusId] = useState(1);
    const [assignedUserId, setAssignedUserId] =
        useState<number | null>(null);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim()) return;

        setSaving(true);

        try {
            await onSubmit({
                title: title.trim(),
                description,
                statusId,
                assignedUserId
            });

            // Reset form after successful creation
            setTitle("");
            setDescription("");
            setStatusId(1);
            setAssignedUserId(null);
            onClose();
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Add New Issue</DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    required
                    label="Title"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusId}
                        label="Status"
                        onChange={(e) =>
                            setStatusId(Number(e.target.value))
                        }
                    >
                        {statuses.map((status) => (
                            <MenuItem
                                key={status.id}
                                value={status.id}
                            >
                                {status.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Assigned User</InputLabel>
                    <Select
                        value={assignedUserId ?? -1}
                        label="Assigned User"
                        onChange={(e) =>
                            setAssignedUserId(
                                e.target.value === -1
                                    ? null
                                    : Number(e.target.value)
                            )
                        }
                    >
                        <MenuItem value={-1}>
                            Unassigned
                        </MenuItem>

                        {users.map((user) => (
                            <MenuItem
                                key={user.id}
                                value={user.id}
                            >
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={saving}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!title.trim() || saving}
                >
                    {saving ? "Creating..." : "Create Issue"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
