// File: components/details/UserSettingsTab.jsx
import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Button,
    Typography,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Box,
    Alert,
    Stack
} from '@mui/material';
import {
    Security as SecurityIcon,
    Person as PersonIcon,
    LockPerson as LockPersonIcon,
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@mui/icons-material';

const UserSettingsTab = ({ user, onStatusToggle, onRoleChange }) => {
    const [userRole, setUserRole] = useState(user.type);

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        setUserRole(newRole);
        onRoleChange(user.id, newRole);
    };

    const isAdmin = user.type === 'admin';

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title="Account Settings"
                        subheader="Manage user account settings and permissions"
                    />
                    <CardContent>
                        <Stack spacing={3}>
                            {/* Account Status */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom>
                                    Account Status
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={user.status === 'active'}
                                            onChange={() => onStatusToggle(user.id, user.status)}
                                            color="primary"
                                        />
                                    }
                                    label={user.status === 'active' ? 'Active' : 'Inactive'}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {user.status === 'active'
                                        ? 'User can log in and access the platform'
                                        : 'User cannot log in or access any features'}
                                </Typography>
                            </Box>

                            <Divider />

                            {/* User Role */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom>
                                    User Role
                                </Typography>
                                {isAdmin ? (
                                    <Alert severity="info" icon={<SecurityIcon />} sx={{ mb: 2 }}>
                                        Admin accounts cannot be changed to other roles via this interface for security reasons.
                                    </Alert>
                                ) : (
                                    <>
                                        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
                                            <InputLabel>Role</InputLabel>
                                            <Select
                                                value={userRole}
                                                onChange={handleRoleChange}
                                                label="Role"
                                                disabled={isAdmin}
                                            >
                                                <MenuItem value="renter">Renter</MenuItem>
                                                <MenuItem value="landlord">Landlord</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Typography variant="body2" color="text.secondary">
                                            {userRole === 'landlord'
                                                ? 'Landlords can list properties and manage their listings'
                                                : 'Renters can browse listings and submit inquiries'}
                                        </Typography>
                                    </>
                                )}
                            </Box>

                            <Divider />

                            {/* Danger Zone */}
                            <Box>
                                <Typography variant="subtitle1" color="error" gutterBottom>
                                    Danger Zone
                                </Typography>
                                <Stack spacing={2}>
                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        startIcon={<LockPersonIcon />}
                                        fullWidth
                                    >
                                        Reset User Password
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        fullWidth
                                        disabled={isAdmin} // Can't delete admin accounts
                                    >
                                        Delete Account
                                    </Button>
                                </Stack>
                                {isAdmin && (
                                    <Alert severity="warning" icon={<SecurityIcon />} sx={{ mt: 2 }}>
                                        Admin accounts have additional protections and cannot be deleted through this interface.
                                    </Alert>
                                )}
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserSettingsTab;