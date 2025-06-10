import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const EventDetails = ({ open, onClose, event, onDelete }) => {
    if (!event) return null;

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
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" mb={2}>Event Details</Typography>
                <Typography variant="body1"><strong>Title:</strong> {event.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Date:</strong> {new Date(event.start).toDateString()}
                </Typography>

                <Box mt={3} display="flex" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                            onDelete(event);
                            onClose();
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EventDetails;
