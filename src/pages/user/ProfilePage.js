import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    Divider,
    Tab,
    Tabs,
    IconButton,
    Badge,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Switch,
    FormControlLabel,
    Alert,
    Snackbar
} from '@mui/material';
import {
    CameraAlt as CameraAltIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Lock as LockIcon,
    Notifications as NotificationsIcon,
    Favorite as FavoriteIcon,
    History as HistoryIcon,
    Message as MessageIcon,
    Home as HomeIcon
} from '@mui/icons-material';
import RootLayout from '../../layouts/RootLayout';

// TabPanel component to handle tab content
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// Mock user data
const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Anytown, USA',
    bio: 'Real estate enthusiast looking for my dream home.',
    profilePic: '/api/placeholder/150/150',
    notifications: {
        emailAlerts: true,
        propertyUpdates: true,
        newListings: false,
        messages: true
    },
    favoriteProperties: [
        {
            id: 'prop1',
            name: 'Luxury Villa',
            location: 'Beverly Hills',
            image: '/api/placeholder/80/80',
            price: '$2,500,000'
        },
        {
            id: 'prop2',
            name: 'Modern Apartment',
            location: 'Downtown',
            image: '/api/placeholder/80/80',
            price: '$850,000'
        }
    ],
    recentSearches: [
        {
            id: 'search1',
            query: 'Houses in Los Angeles',
            date: '2025-03-10T14:30:00Z'
        },
        {
            id: 'search2',
            query: 'Apartments in New York',
            date: '2025-03-08T09:15:00Z'
        }
    ],
    messages: [
        {
            id: 'msg1',
            from: 'Agent Smith',
            message: 'I found a property that matches your criteria!',
            date: '2025-03-12T11:20:00Z',
            read: false
        },
        {
            id: 'msg2',
            from: 'Support Team',
            message: 'Your account has been verified successfully.',
            date: '2025-03-05T16:45:00Z',
            read: true
        }
    ]
};

const ProfilePage = () => {
    // State for user data
    const [userData, setUserData] = useState(mockUser);
    const [editMode, setEditMode] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [editedData, setEditedData] = useState(userData);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        if (editMode) {
            // Save changes
            setUserData(editedData);
            setSnackbar({
                open: true,
                message: 'Profile updated successfully!',
                severity: 'success'
            });
        }
        setEditMode(!editMode);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value
        });
    };

    // Handle notification preference changes
    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setEditedData({
            ...editedData,
            notifications: {
                ...editedData.notifications,
                [name]: checked
            }
        });
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <RootLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    {/* Profile Overview */}
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'center', sm: 'flex-start' },
                                position: 'relative'
                            }}
                        >
                            {/* Profile Picture */}
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <IconButton
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '&:hover': { bgcolor: 'primary.dark' },
                                            width: 36,
                                            height: 36
                                        }}
                                    >
                                        <CameraAltIcon sx={{ fontSize: 20 }} />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    src={userData.profilePic}
                                    alt={`${userData.firstName} ${userData.lastName}`}
                                    sx={{ width: 150, height: 150, mb: { xs: 2, sm: 0 }, mr: { sm: 4 } }}
                                />
                            </Badge>

                            {/* Profile Info */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h4" gutterBottom>
                                    {userData.firstName} {userData.lastName}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                    {userData.email}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                    {userData.phone}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2, maxWidth: '80%' }}>
                                    {userData.bio}
                                </Typography>
                            </Box>

                            {/* Edit Button */}
                            <Button
                                startIcon={editMode ? <SaveIcon /> : <EditIcon />}
                                variant={editMode ? "contained" : "outlined"}
                                onClick={toggleEditMode}
                                sx={{ position: { sm: 'absolute' }, top: { sm: 20 }, right: { sm: 20 } }}
                            >
                                {editMode ? "Save Profile" : "Edit Profile"}
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Tabs and Content */}
                    <Grid item xs={12}>
                        <Paper sx={{ width: '100%' }}>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="profile tabs"
                            >
                                <Tab icon={<HomeIcon />} label="Account Details" />
                                <Tab icon={<LockIcon />} label="Security" />
                                <Tab icon={<NotificationsIcon />} label="Notifications" />
                                <Tab icon={<FavoriteIcon />} label="Favorites" />
                                <Tab icon={<HistoryIcon />} label="Recent Activity" />
                                <Tab icon={<MessageIcon />} label="Messages" />
                            </Tabs>

                            {/* Account Details Tab */}
                            <TabPanel value={tabValue} index={0}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            value={editMode ? editedData.firstName : userData.firstName}
                                            onChange={handleInputChange}
                                            disabled={!editMode}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            value={editMode ? editedData.lastName : userData.lastName}
                                            onChange={handleInputChange}
                                            disabled={!editMode}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={editMode ? editedData.email : userData.email}
                                            onChange={handleInputChange}
                                            disabled={!editMode}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            value={editMode ? editedData.phone : userData.phone}
                                            onChange={handleInputChange}
                                            disabled={!editMode}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            name="address"
                                            value={editMode ? editedData.address : userData.address}
                                            onChange={handleInputChange}
                                            disabled={!editMode}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Bio"
                                            name="bio"
                                            multiline
                                            rows={4}
                                            value={editMode ? editedData.bio : userData.bio}
                                            onChange={handleInputChange}
                                            disabled={!editMode}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            {/* Security Tab */}
                            <TabPanel value={tabValue} index={1}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Current Password"
                                            type="password"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ height: 56 }} /> {/* Spacer to align with input */}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="New Password"
                                            type="password"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Confirm New Password"
                                            type="password"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 2 }}
                                        >
                                            Update Password
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="h6" gutterBottom>
                                            Two-Factor Authentication
                                        </Typography>
                                        <FormControlLabel
                                            control={<Switch />}
                                            label="Enable Two-Factor Authentication"
                                        />
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Enhance your account security by enabling two-factor authentication.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            {/* Notifications Tab */}
                            <TabPanel value={tabValue} index={2}>
                                <Typography variant="h6" gutterBottom>
                                    Notification Preferences
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={editMode ? editedData.notifications.emailAlerts : userData.notifications.emailAlerts}
                                                    onChange={handleNotificationChange}
                                                    name="emailAlerts"
                                                    disabled={!editMode}
                                                />
                                            }
                                            label="Email Alerts"
                                        />
                                        <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
                                            Receive important account notifications via email
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={editMode ? editedData.notifications.propertyUpdates : userData.notifications.propertyUpdates}
                                                    onChange={handleNotificationChange}
                                                    name="propertyUpdates"
                                                    disabled={!editMode}
                                                />
                                            }
                                            label="Property Updates"
                                        />
                                        <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
                                            Get notified when there are updates to properties you're interested in
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={editMode ? editedData.notifications.newListings : userData.notifications.newListings}
                                                    onChange={handleNotificationChange}
                                                    name="newListings"
                                                    disabled={!editMode}
                                                />
                                            }
                                            label="New Listings"
                                        />
                                        <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
                                            Receive notifications about new properties that match your criteria
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={editMode ? editedData.notifications.messages : userData.notifications.messages}
                                                    onChange={handleNotificationChange}
                                                    name="messages"
                                                    disabled={!editMode}
                                                />
                                            }
                                            label="Messages"
                                        />
                                        <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
                                            Get notified when you receive new messages
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            {/* Favorites Tab */}
                            <TabPanel value={tabValue} index={3}>
                                <Typography variant="h6" gutterBottom>
                                    Favorite Properties
                                </Typography>
                                <Grid container spacing={3}>
                                    {userData.favoriteProperties.length > 0 ? (
                                        userData.favoriteProperties.map((property) => (
                                            <Grid item xs={12} sm={6} md={4} key={property.id}>
                                                <Card>
                                                    <Box sx={{ display: 'flex', p: 2 }}>
                                                        <Avatar
                                                            src={property.image}
                                                            alt={property.name}
                                                            variant="rounded"
                                                            sx={{ width: 80, height: 80, mr: 2 }}
                                                        />
                                                        <Box>
                                                            <Typography variant="subtitle1" component="div">
                                                                {property.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {property.location}
                                                            </Typography>
                                                            <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                                                                {property.price}
                                                            </Typography>
                                                            <Chip
                                                                label="View Details"
                                                                size="small"
                                                                color="primary"
                                                                sx={{ mt: 1 }}
                                                                onClick={() => { }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Grid item xs={12}>
                                            <Typography variant="body1" color="text.secondary">
                                                You don't have any favorite properties yet.
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </TabPanel>

                            {/* Recent Activity Tab */}
                            <TabPanel value={tabValue} index={4}>
                                <Typography variant="h6" gutterBottom>
                                    Recent Searches
                                </Typography>
                                <List>
                                    {userData.recentSearches.map((search) => (
                                        <ListItem key={search.id} divider>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <HistoryIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={search.query}
                                                secondary={formatDate(search.date)}
                                            />
                                            <Chip
                                                label="Repeat Search"
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                                onClick={() => { }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </TabPanel>

                            {/* Messages Tab */}
                            <TabPanel value={tabValue} index={5}>
                                <Typography variant="h6" gutterBottom>
                                    Messages
                                </Typography>
                                <List>
                                    {userData.messages.map((message) => (
                                        <ListItem
                                            key={message.id}
                                            divider
                                            sx={{
                                                bgcolor: message.read ? 'inherit' : 'rgba(25, 118, 210, 0.08)'
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {message.from.charAt(0)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="subtitle1">
                                                            {message.from}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {formatDate(message.date)}
                                                        </Typography>
                                                    </Box>
                                                }
                                                secondary={message.message}
                                            />
                                            {!message.read && (
                                                <Chip
                                                    label="New"
                                                    size="small"
                                                    color="primary"
                                                    sx={{ ml: 1 }}
                                                />
                                            )}
                                        </ListItem>
                                    ))}
                                </List>
                            </TabPanel>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Success/Error Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </RootLayout>
    );
};

export default ProfilePage;