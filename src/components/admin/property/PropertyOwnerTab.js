// File: components/property/details/PropertyOwnerTab.jsx
import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Box,
    Typography,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Chip,
    Stack,
    Paper
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Home as HomeIcon,
    VerifiedUser as VerifiedIcon,
    Warning as WarningIcon,
    CalendarToday as CalendarIcon,
    Message as MessageIcon
} from '@mui/icons-material';

const PropertyOwnerTab = ({ owner }) => {
    const userTypeColor = () => {
        switch (owner.type) {
            case 'landlord':
                return 'warning.main';
            case 'agent':
                return 'info.main';
            case 'admin':
                return 'primary.main';
            default:
                return 'success.main';
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar
                            src={owner.avatar}
                            sx={{
                                width: 120,
                                height: 120,
                                margin: '0 auto 16px',
                                bgcolor: userTypeColor()
                            }}
                        >
                            {owner.name.charAt(0)}
                        </Avatar>
                        <Typography variant="h5" gutterBottom>{owner.name}</Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {owner.type.charAt(0).toUpperCase() + owner.type.slice(1)}
                        </Typography>

                        <Box display="flex" justifyContent="center" mb={2}>
                            {owner.verified ? (
                                <Chip
                                    icon={<VerifiedIcon />}
                                    label="Verified Account"
                                    color="info"
                                    sx={{ width: '100%' }}
                                />
                            ) : (
                                <Chip
                                    icon={<WarningIcon />}
                                    label="Not Verified"
                                    variant="outlined"
                                    color="warning"
                                    sx={{ width: '100%' }}
                                />
                            )}
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<MessageIcon />}
                            fullWidth
                        >
                            Contact Owner
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardHeader title="Owner Information" />
                    <Divider />
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <PersonIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Full Name" secondary={owner.name} />
                            </ListItem>

                            <Divider variant="inset" component="li" />

                            <ListItem>
                                <ListItemIcon>
                                    <EmailIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Email Address" secondary={owner.email} />
                            </ListItem>

                            <Divider variant="inset" component="li" />

                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Phone Number" secondary={owner.phone} />
                            </ListItem>

                            {owner.address && (
                                <>
                                    <Divider variant="inset" component="li" />

                                    <ListItem>
                                        <ListItemIcon>
                                            <HomeIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Address" secondary={owner.address} />
                                    </ListItem>
                                </>
                            )}

                            <Divider variant="inset" component="li" />

                            <ListItem>
                                <ListItemIcon>
                                    <HomeIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Total Properties"
                                    secondary={`${owner.propertyCount || 0} properties listed`}
                                />
                            </ListItem>

                            {owner.memberSince && (
                                <>
                                    <Divider variant="inset" component="li" />

                                    <ListItem>
                                        <ListItemIcon>
                                            <CalendarIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Member Since"
                                            secondary={new Date(owner.memberSince).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </CardContent>
                </Card>

                {owner.bio && (
                    <Card sx={{ mt: 3 }}>
                        <CardHeader title="About Owner" />
                        <Divider />
                        <CardContent>
                            <Typography variant="body1">{owner.bio}</Typography>
                        </CardContent>
                    </Card>
                )}

                {owner.otherProperties && owner.otherProperties.length > 0 && (
                    <Card sx={{ mt: 3 }}>
                        <CardHeader title="Other Properties by this Owner" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2}>
                                {owner.otherProperties.map((property, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Paper variant="outlined" sx={{ p: 1 }}>
                                            <Stack direction="row" spacing={2}>
                                                <Box
                                                    component="img"
                                                    src={property.image}
                                                    alt={property.title}
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 1,
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <Box>
                                                    <Typography variant="subtitle2">{property.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {property.price}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </Grid>
    );
};

export default PropertyOwnerTab;