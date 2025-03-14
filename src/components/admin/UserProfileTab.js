// File: components/details/UserProfileTab.jsx
import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Typography,
    Box,
    Chip
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Home as HomeIcon,
    CalendarToday as CalendarIcon,
    VerifiedUser as VerifiedIcon
} from '@mui/icons-material';

// Import utility functions
import { getUserTypeIcon, getUserStatusChip, formatDate } from '../utils/userUtils';

const UserProfileTab = ({ user }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                margin: '0 auto 16px',
                                bgcolor: user.type === 'admin' ? 'primary.main' :
                                    user.type === 'landlord' ? 'warning.main' : 'success.main'
                            }}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            {user.email}
                        </Typography>

                        <Box display="flex" justifyContent="center" mb={2}>
                            <Chip
                                icon={getUserTypeIcon(user.type)}
                                label={user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                                color={user.type === 'admin' ? 'primary' :
                                    user.type === 'landlord' ? 'warning' : 'success'}
                                sx={{ mr: 1 }}
                            />
                            {getUserStatusChip(user.status)}
                        </Box>

                        {user.verified ? (
                            <Chip
                                icon={<VerifiedIcon />}
                                label="Verified Account"
                                color="info"
                                sx={{ width: '100%' }}
                            />
                        ) : (
                            <Chip
                                label="Not Verified"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
                        )}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card sx={{ height: '100%' }}>
                    <CardHeader title="User Information" />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    <PersonIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Full Name
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {user.name}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    <EmailIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Email Address
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {user.email}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    <PhoneIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Phone Number
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {user.phone}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    <HomeIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Address
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {user.address}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    <CalendarIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Registration Date
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {formatDate(user.registrationDate)}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    <CalendarIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Last Active
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {formatDate(user.lastActive)}
                                </Typography>
                            </Grid>

                            {user.type === 'landlord' && (
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        <HomeIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                        Properties Listed
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {user.properties}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserProfileTab;