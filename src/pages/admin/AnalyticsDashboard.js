import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import {
    Person as PersonIcon,
    Home as HomeIcon,
    PieChart as PieChartIcon,
    TrendingUp as TrendingUpIcon,
    Notifications as NotificationsIcon,
    Refresh as RefreshIcon,
    MoreVert as MoreVertIcon,
    SupervisorAccount as AdminIcon,
    BusinessCenter as LandlordIcon,
    People as RenterIcon,
    Apartment as ApartmentIcon,
    House as HouseIcon,
    LocationOn as LocationIcon,
    BusinessCenter
} from '@mui/icons-material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import RootLayout from '../../layouts/RootLayout';

// Mock data - replace with actual API calls in production
const userData = {
    total: 3487,
    breakdown: [
        { type: 'Admin', count: 24, icon: <AdminIcon /> },
        { type: 'Landlords', count: 876, icon: <LandlordIcon /> },
        { type: 'Buyers/Renters', count: 2587, icon: <RenterIcon /> }
    ],
    growth: '+12.3% this month'
};

const propertyData = {
    total: 2156,
    byStatus: [
        { name: 'Active', value: 1245, color: '#4caf50' },
        { name: 'Pending', value: 432, color: '#ff9800' },
        { name: 'Sold/Rented', value: 347, color: '#2196f3' },
        { name: 'Unlisted', value: 132, color: '#9e9e9e' }
    ],
    byType: [
        { name: 'Apartment', value: 945, icon: <ApartmentIcon /> },
        { name: 'House', value: 782, icon: <HouseIcon /> },
        { name: 'Commercial', value: 243, icon: <BusinessCenter /> },
        { name: 'Land', value: 186, icon: <LocationIcon /> }
    ],
    byLocation: [
        { name: 'Downtown', value: 532 },
        { name: 'Suburbs', value: 874 },
        { name: 'Uptown', value: 421 },
        { name: 'Outskirts', value: 329 }
    ]
};

const recentActivityData = [
    {
        id: 1,
        type: 'New User',
        description: 'John Doe registered as a buyer',
        time: '10 minutes ago',
        avatar: <PersonIcon />
    },
    {
        id: 2,
        type: 'New Listing',
        description: 'Premium Apartment in Downtown added by Emma Thompson',
        time: '45 minutes ago',
        avatar: <HomeIcon />
    },
    {
        id: 3,
        type: 'Inquiry',
        description: 'Sarah James made an inquiry about Beach House property',
        time: '2 hours ago',
        avatar: <NotificationsIcon />
    },
    {
        id: 4,
        type: 'Property Sold',
        description: 'Mountain View Villa marked as sold by agent Michael Brown',
        time: '4 hours ago',
        avatar: <HomeIcon />
    },
    {
        id: 5,
        type: 'New User',
        description: 'Emily Wilson registered as a landlord',
        time: '6 hours ago',
        avatar: <PersonIcon />
    }
];

const keyMetricsData = [
    { name: 'New Registrations', value: 67, change: '+12%', trend: 'up' },
    { name: 'New Listings', value: 43, change: '+7%', trend: 'up' },
    { name: 'Inquiries', value: 128, change: '+21%', trend: 'up' },
    { name: 'Sales/Rentals', value: 31, change: '-5%', trend: 'down' }
];

const monthlyData = [
    { name: 'Jan', listings: 65, users: 42, inquiries: 130 },
    { name: 'Feb', listings: 59, users: 51, inquiries: 100 },
    { name: 'Mar', listings: 80, users: 62, inquiries: 110 },
    { name: 'Apr', listings: 81, users: 74, inquiries: 145 },
    { name: 'May', listings: 56, users: 64, inquiries: 180 },
    { name: 'Jun', listings: 55, users: 57, inquiries: 160 },
    { name: 'Jul', listings: 40, users: 67, inquiries: 120 },
    { name: 'Aug', listings: 94, users: 82, inquiries: 170 },
    { name: 'Sep', listings: 108, users: 93, inquiries: 210 },
    { name: 'Oct', listings: 126, users: 106, inquiries: 245 },
    { name: 'Nov', listings: 132, users: 121, inquiries: 260 },
    { name: 'Dec', listings: 144, users: 139, inquiries: 285 }
];

// Dashboard Component
const AnalyticsDashboard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const refreshData = () => {
        setLoading(true);
        // Add actual data refresh logic here
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <RootLayout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Analytics Dashboard
                    </Typography>
                    <IconButton onClick={refreshData} disabled={loading}>
                        <RefreshIcon />
                    </IconButton>
                </Box>

                {/* Top metrics cards */}
                <Grid container spacing={3} mb={4}>
                    {/* User metrics */}
                    <Grid item xs={12} md={6} lg={3}>
                        <Card elevation={3}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#673ab7' }}>
                                        <PersonIcon />
                                    </Avatar>
                                }
                                title="Total Users"
                                subheader={userData.growth}
                            />
                            <CardContent>
                                <Typography variant="h3" component="div" gutterBottom>
                                    {userData.total.toLocaleString()}
                                </Typography>
                                <Grid container spacing={0}>
                                    {userData.breakdown.map((item, index) => (
                                        <Grid item xs={4} key={index}>
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <Avatar sx={{ bgcolor: '#f5f5f5', color: '#673ab7', mb: 1 }}>
                                                    {item.icon}
                                                </Avatar>
                                                <Typography variant="body2" color="textSecondary">
                                                    {item.type}
                                                </Typography>
                                                <Typography variant="h6">
                                                    {item.count.toLocaleString()}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Property metrics */}
                    <Grid item xs={12} md={6} lg={3}>
                        <Card elevation={3}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#2196f3' }}>
                                        <HomeIcon />
                                    </Avatar>
                                }
                                title="Total Properties"
                                subheader="By status and type"
                            />
                            <CardContent>
                                <Typography variant="h3" component="div" gutterBottom>
                                    {propertyData.total.toLocaleString()}
                                </Typography>
                                <Box justifyContent="space-around" mb={2}>
                                    {propertyData.byStatus.map((status, index) => (
                                        <Chip
                                            key={index}
                                            label={`${status.name}: ${status.value}`}
                                            sx={{
                                                bgcolor: status.color,
                                                color: 'white',
                                                mb: 1
                                            }}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Key metrics */}
                    <Grid item xs={12} md={6} lg={3}>
                        <Card elevation={3}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#ff9800' }}>
                                        <PieChartIcon />
                                    </Avatar>
                                }
                                title="Key Metrics"
                                subheader="Last 30 days"
                            />
                            <CardContent>
                                <Grid container spacing={2}>
                                    {keyMetricsData.map((metric, index) => (
                                        <Grid item xs={6} key={index}>
                                            <Box p={1} borderRadius={1} sx={{ bgcolor: '#f5f5f5' }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {metric.name}
                                                </Typography>
                                                <Box display="flex" alignItems="center">
                                                    <Typography variant="h6" component="div" mr={1}>
                                                        {metric.value}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color={metric.trend === 'up' ? 'success.main' : 'error.main'}
                                                    >
                                                        {metric.change}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Location breakdown */}
                    <Grid item xs={12} md={6} lg={3}>
                        <Card elevation={3}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#4caf50' }}>
                                        <LocationIcon />
                                    </Avatar>
                                }
                                title="Property Locations"
                                subheader="Geographic distribution"
                            />
                            <CardContent>
                                <TableContainer>
                                    <Table size="small">
                                        <TableBody>
                                            {propertyData.byLocation.map((location, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{location.name}</TableCell>
                                                    <TableCell align="right">{location.value}</TableCell>
                                                    <TableCell align="right">
                                                        {Math.round((location.value / propertyData.total) * 100)}%
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Charts and activity feed */}
                <Grid container spacing={3}>
                    {/* Trend charts */}
                    <Grid item xs={12} lg={8}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                            <Box display="flex" justifyContent="space-between" mb={3}>
                                <Typography variant="h6" component="h2">
                                    Growth Trends
                                </Typography>
                                <Box>
                                    {/* Chart controls could go here */}
                                </Box>
                            </Box>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="listings"
                                        stroke="#2196f3"
                                        activeDot={{ r: 8 }}
                                        name="New Listings"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#673ab7"
                                        name="New Users"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="inquiries"
                                        stroke="#ff9800"
                                        name="Inquiries"
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="h6" component="h2" mb={2}>
                                Property Breakdown
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" align="center" gutterBottom>
                                        By Type
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={propertyData.byType}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                nameKey="name"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {propertyData.byType.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={['#673ab7', '#2196f3', '#ff9800', '#4caf50'][index % 4]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1" align="center" gutterBottom>
                                        By Status
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={propertyData.byStatus}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                nameKey="name"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {propertyData.byStatus.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Activity feed */}
                    <Grid item xs={12} lg={4}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="h6" component="h2">
                                    Recent Activity
                                </Typography>
                                <IconButton size="small">
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>

                            <List>
                                {recentActivityData.map((activity) => (
                                    <React.Fragment key={activity.id}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar sx={{
                                                    bgcolor: activity.type.includes('User') ? '#673ab7' :
                                                        activity.type.includes('Listing') || activity.type.includes('Property') ? '#2196f3' :
                                                            '#ff9800'
                                                }}>
                                                    {activity.avatar}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="subtitle2">
                                                        {activity.type}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <>
                                                        <Typography variant="body2" color="textPrimary" component="span">
                                                            {activity.description}
                                                        </Typography>
                                                        <Typography variant="caption" display="block" color="textSecondary">
                                                            {activity.time}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </RootLayout>
    );
};

export default AnalyticsDashboard;