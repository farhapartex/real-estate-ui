// File: components/UserDetailsDialog.jsx
import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Tabs,
    Tab,
    Grid
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Import tabs components
import UserProfileTab from '../admin/UserProfileTab';
import UserVerificationTab from '../admin/UserVerificationTab';
import UserSettingsTab from '../admin/UserSettingsTab';

const UserDetailsDialog = ({
    open,
    onClose,
    user,
    onStatusToggle,
    onRoleChange,
    onVerify
}) => {
    const [dialogTab, setDialogTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setDialogTab(newValue);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">User Details</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <Tabs
                value={dialogTab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="Profile" />
                <Tab label="Verification" />
                <Tab label="Settings" />
            </Tabs>

            <DialogContent dividers>
                {dialogTab === 0 && (
                    <UserProfileTab user={user} />
                )}

                {dialogTab === 1 && (
                    <UserVerificationTab
                        user={user}
                        onVerify={() => onVerify(user.id)}
                    />
                )}

                {dialogTab === 2 && (
                    <UserSettingsTab
                        user={user}
                        onStatusToggle={() => onStatusToggle(user.id, user.status)}
                        onRoleChange={onRoleChange}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailsDialog;