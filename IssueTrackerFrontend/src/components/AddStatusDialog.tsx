import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";

interface AddStatusDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (statusName: string) => Promise<void>;
}

export default function AddStatusDialog({
    open,
    onClose,
    onSubmit
}: AddStatusDialogProps) {
    const [statusName, setStatusName] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {
        const trimmedStatusName = statusName.trim();
        if (!trimmedStatusName) return;

        setSaving(true);

        try {
            await onSubmit(trimmedStatusName);
            setStatusName("");
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
            <DialogTitle>Add New Status</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    required
                    label="Status Name"
                    margin="normal"
                    value={statusName}
                    onChange={(event) => setStatusName(event.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={saving}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!statusName.trim() || saving}
                >
                    {saving ? "Creating..." : "Create Status"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
