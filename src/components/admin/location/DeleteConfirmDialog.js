// File: components/common/DeleteConfirmDialog.jsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import {
    Close as CloseIcon,
    DeleteForever as DeleteForeverIcon,
    Warning as WarningIcon
} from '@mui/icons-material';

const DeleteConfirmDialog = ({ open, onClose, onConfirm, itemType, itemName }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                        <DeleteForeverIcon color="error" />
                        <Typography variant="h6">Confirm Deletion</Typography>
                    </Box>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 2
                    }}
                >
                    <WarningIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="body1" align="center" gutterBottom>
                        Are you sure you want to delete the following {itemType}?
                    </Typography>
                    <Typography variant="h6" color="error" align="center" gutterBottom>
                        {itemName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        This action cannot be undone and may affect dependent data.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained" startIcon={<DeleteForeverIcon />}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;