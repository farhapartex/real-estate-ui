import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Button,
    Tabs,
    Tab,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Divider,
    Menu,
    MenuItem,
    IconButton,
    Breadcrumbs,
    Link,
    TextField,
    InputAdornment,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    LocationOn as LocationOnIcon,
    HomeWork as HomeWorkIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';
import RootLayout from '../../layouts/RootLayout';
import { propertyService } from '../../api/property';

// Sample property data - in a real app, this would come from an API
const mockProperties = [
    {
        id: 1,
        title: 'Modern Apartment with City View',
        images: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353'],
        price: 250000,
        purpose: 'sell',
        location: 'Downtown',
        district: 'Central District',
        division: 'Northern Division',
        country: 'USA',
        propertyType: 'Apartment',
        bedrooms: 3,
        bathrooms: 2,
        size: 1200,
        status: 'Active',
        createdAt: '2025-02-15T14:30:00Z',
        views: 245,
        inquiries: 12
    },
    {
        id: 2,
        title: 'Cozy Studio for Rent',
        images: ['https://images.unsplash.com/photo-1505691723518-36a5ac3be353'],
        price: 1200,
        purpose: 'rent',
        location: 'University Area',
        district: 'Eastern District',
        division: 'Eastern Division',
        country: 'USA',
        propertyType: 'Studio',
        bedrooms: 1,
        bathrooms: 1,
        size: 450,
        status: 'Active',
        createdAt: '2025-02-18T10:15:00Z',
        views: 178,
        inquiries: 8
    },
    {
        id: 3,
        title: 'Family Home with Garden',
        images: ['https://images.unsplash.com/photo-1499916078039-922301b0eb9b'],
        price: 450000,
        purpose: 'sell',
        location: 'Suburban Area',
        district: 'Western District',
        division: 'Western Division',
        country: 'USA',
        propertyType: 'House',
        bedrooms: 4,
        bathrooms: 3,
        size: 2400,
        status: 'Pending Approval',
        createdAt: '2025-03-01T09:45:00Z',
        views: 120,
        inquiries: 5
    },
    {
        id: 4,
        title: 'Luxury Villa with Pool',
        images: ['https://images.unsplash.com/photo-1499916078039-922301b0eb9b'],
        price: 1200000,
        purpose: 'sell',
        location: 'Beach Area',
        district: 'Coastal District',
        division: 'Southern Division',
        country: 'USA',
        propertyType: 'Villa',
        bedrooms: 5,
        bathrooms: 4,
        size: 3800,
        status: 'Draft',
        createdAt: '2025-03-05T16:20:00Z',
        views: 0,
        inquiries: 0
    },
    {
        id: 5,
        title: 'Commercial Space for Rent',
        images: ['https://images.unsplash.com/photo-1499916078039-922301b0eb9b'],
        price: 3500,
        purpose: 'rent',
        location: 'Business District',
        district: 'Central District',
        division: 'Central Division',
        country: 'USA',
        propertyType: 'Commercial',
        bedrooms: 0,
        bathrooms: 2,
        size: 1800,
        status: 'Active',
        createdAt: '2025-02-25T11:30:00Z',
        views: 89,
        inquiries: 3
    }
];

const OwnerPropertiesPage = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [purposeFilter, setPurposeFilter] = useState('all');
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const fetchProperties = async () => {
        //setLoading(true);

        try {
            const result = await propertyService.ownerPropertyList(page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                //setLoading(false);
                // const formattedData = data.map(country => ({
                //     id: country.id,
                //     name: country.name,
                //     code: country.code,
                //     status: country.status,
                //     divisions: country.divisions
                // }));
                console.log("data: ", data);
                setProperties(data);
                setTotalItems(total);

            } else {
                setSnackbar({
                    open: true,
                    message: 'Failed to fetch countries',
                    severity: 'error'
                });
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            setSnackbar({
                open: true,
                message: 'An error occurred while fetching countries',
                severity: 'error'
            });
        } finally {
            //setLoading(false);
        }
    }

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Handle menu open
    const handleMenuOpen = (event, propertyId) => {
        event.stopPropagation();
        setMenuAnchorEl(event.currentTarget);
        setSelectedPropertyId(propertyId);
    };

    // Handle menu close
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedPropertyId(null);
    };

    // Handle view property
    const handleViewProperty = () => {
        navigate(`/owner/properties/${selectedPropertyId}`);
        handleMenuClose();
    };

    // Handle edit property
    const handleEditProperty = () => {
        navigate(`/owner/properties/${selectedPropertyId}/edit`);
        handleMenuClose();
    };

    // Handle delete property
    const handleDeleteProperty = () => {
        // Add confirmation dialog and delete functionality here
        console.log(`Delete property ${selectedPropertyId}`);
        handleMenuClose();
    };

    // Handle add new property
    const handleAddProperty = () => {
        navigate('/owner/properties/new');
    };

    // Handle property card click
    const handlePropertyClick = (propertyId) => {
        navigate(`/owner/properties/${propertyId}`);
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Format price for display
    const formatPrice = (price, purpose) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BDT',
            maximumFractionDigits: 0
        }).format(price) + (purpose === 'rent' ? '/month' : '');
    };

    // Filter properties based on tab, search term, and filters
    const getFilteredProperties = () => {
        return properties.filter(property => {
            // Filter by tab (status)
            //if (tabValue === 1 && property.status !== 'active') return false;
            //if (tabValue === 2 && property.status !== 'pending') return false;
            //if (tabValue === 3 && property.status !== 'draft') return false;

            // Filter by search term
            if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

            // Filter by status
            if (statusFilter !== 'all' && property.status !== statusFilter) return false;

            // Filter by property type
            if (typeFilter !== 'all' && property.propertyType !== typeFilter) return false;

            // Filter by purpose
            if (purposeFilter !== 'all' && property.purpose !== purposeFilter) return false;

            return true;
        });

        //return properties;
    };


    useEffect(() => {
        fetchProperties();

        console.log("filteredProperties: ", filteredProperties);
    }, [page, pageSize]);


    useEffect(() => {
        const filtered = getFilteredProperties();
        setFilteredProperties(filtered);
    }, [properties, searchTerm, statusFilter, typeFilter, purposeFilter, tabValue]);

    //const filteredProperties = getFilteredProperties();

    return (
        <RootLayout>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 3 }}
                >
                    <Link
                        underline="hover"
                        color="inherit"
                        component={RouterLink}
                        to="/owner/dashboard"
                    >
                        Dashboard
                    </Link>
                    <Typography color="text.primary">My Properties</Typography>
                </Breadcrumbs>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        My Properties
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddProperty}
                    >
                        Add New Property
                    </Button>
                </Box>

                {/* Filters and Search */}
                <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                placeholder="Search properties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="all">All Statuses</MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="pending">Pending Approval</MenuItem>
                                    <MenuItem value="draft">Draft</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2.5}>
                            <FormControl fullWidth>
                                <InputLabel>Property Type</InputLabel>
                                <Select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    label="Property Type"
                                >
                                    <MenuItem value="all">All Types</MenuItem>
                                    <MenuItem value="Apartment">Apartment</MenuItem>
                                    <MenuItem value="House">House</MenuItem>
                                    <MenuItem value="Villa">Villa</MenuItem>
                                    <MenuItem value="Studio">Studio</MenuItem>
                                    <MenuItem value="Commercial">Commercial</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Purpose</InputLabel>
                                <Select
                                    value={purposeFilter}
                                    onChange={(e) => setPurposeFilter(e.target.value)}
                                    label="Purpose"
                                >
                                    <MenuItem value="all">All Purposes</MenuItem>
                                    <MenuItem value="rent">For Rent</MenuItem>
                                    <MenuItem value="sell">For Sale</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Property Cards */}
                {filteredProperties.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredProperties.map((property) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                        }
                                    }}
                                    onClick={() => handlePropertyClick(property.id)}
                                >
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={'https://images.unsplash.com/photo-1505691723518-36a5ac3be353'}
                                            alt={property.title}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                zIndex: 1
                                            }}
                                        >
                                            <IconButton
                                                sx={{ bgcolor: 'background.paper' }}
                                                onClick={(e) => handleMenuOpen(e, property.id)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>
                                        <Chip
                                            label={property.status}
                                            color={
                                                property.status === 'active'
                                                    ? 'success'
                                                    : property.status === 'pending'
                                                        ? 'warning'
                                                        : 'default'
                                            }
                                            sx={{
                                                position: 'absolute',
                                                bottom: 16,
                                                left: 16,
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" component="div" gutterBottom noWrap>
                                            {property.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                                            {property?.address}, {property.district?.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                            <HomeWorkIcon fontSize="small" sx={{ mr: 0.5 }} />
                                            {property.property_type}
                                        </Typography>
                                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                            {formatPrice(property.price, property.purpose)}
                                        </Typography>
                                        <Chip
                                            label={property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
                                            size="small"
                                            color={property.purpose === 'rent' ? 'info' : 'primary'}
                                            sx={{ mt: 1 }}
                                        />
                                    </CardContent>
                                    <Divider />
                                    <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Added: {formatDate(property?.created_at)}
                                        </Typography>
                                        <Box>
                                            <Chip
                                                label={`${property?.views} views`}
                                                size="small"
                                                variant="outlined"
                                                sx={{ mr: 1 }}
                                            />
                                            <Chip
                                                label={`${property?.inquiries} inquiries`}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            />
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            bgcolor: 'background.default'
                        }}
                    >
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No properties found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Try adjusting your filters or add a new property
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddProperty}
                        >
                            Add New Property
                        </Button>
                    </Paper>
                )}

                {/* Property Actions Menu */}
                <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleViewProperty}>
                        <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                        View Details
                    </MenuItem>
                    <MenuItem onClick={handleEditProperty}>
                        <EditIcon fontSize="small" sx={{ mr: 1 }} />
                        Edit Property
                    </MenuItem>
                    <MenuItem onClick={handleDeleteProperty} sx={{ color: 'error.main' }}>
                        <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                        Delete Property
                    </MenuItem>
                </Menu>
            </Container>
        </RootLayout>
    );
};

export default OwnerPropertiesPage;