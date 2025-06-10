import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const AddEvent = ({ open, onClose, onAdd }) => {
    const [title, setTitle] = useState("");

    const handleAdd = () => {
        if (title.trim()) {
            onAdd(title);
            setTitle("");
        }
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: "50%",
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
        outline: 'none',
        transition: "all 0.3s ease",
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" mb={2}>Add Event</Typography>
                <TextField
                    label="Event Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth onClick={handleAdd}>
                    Add
                </Button>
            </Box>
        </Modal>
    );
};

export default AddEvent;
