import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
    Box,
    Typography,
    Grid,
    Container,
    Breadcrumbs,
    Link,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    Paper,
    CircularProgress,
    Pagination
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PropertyCard from '../components/PropertyCard'; // Adjust path as needed
import PropertyDetailsModal from '../components/modals/PropertyDetailsModal'; // Adjust path as needed
import featuredProperties from '../sampleData';
import RootLayout from '../layouts/RootLayout';

const PropertyListingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    const [totalProperties, setTotalProperties] = useState(0);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Pagination state
    const [page, setPage] = useState(1);
    const propertiesPerPage = 12; // 3 rows of 4 properties

    // Filter states
    const [filters, setFilters] = useState({
        country: '',
        division: '',
        district: '',
        propertyType: '',
        purpose: '', // For rent/sell filter
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: ''
    });

    // Sort state
    const [sortBy, setSortBy] = useState('newest');

    // Parse query params on load
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        // Update filters from URL
        const newFilters = { ...filters };
        if (queryParams.get('country')) newFilters.country = queryParams.get('country');
        if (queryParams.get('division')) newFilters.division = queryParams.get('division');
        if (queryParams.get('district')) newFilters.district = queryParams.get('district');
        if (queryParams.get('propertyType')) newFilters.propertyType = queryParams.get('propertyType');
        if (queryParams.get('purpose')) newFilters.purpose = queryParams.get('purpose');
        if (queryParams.get('minPrice')) newFilters.minPrice = queryParams.get('minPrice');
        if (queryParams.get('maxPrice')) newFilters.maxPrice = queryParams.get('maxPrice');
        if (queryParams.get('bedrooms')) newFilters.bedrooms = queryParams.get('bedrooms');
        if (queryParams.get('bathrooms')) newFilters.bathrooms = queryParams.get('bathrooms');

        setFilters(newFilters);

        // Get page from URL or default to 1
        const pageParam = parseInt(queryParams.get('page')) || 1;
        setPage(pageParam);

        // Get sort from URL or default
        const sortParam = queryParams.get('sort') || 'newest';
        setSortBy(sortParam);

        // Fetch properties based on filters
        fetchProperties(newFilters, pageParam, sortParam);
    }, [location.search]);

    // Function to fetch properties (would connect to your API)
    const fetchProperties = async (currentFilters, currentPage, currentSort) => {
        setLoading(true);
        try {
            // This would be replaced with your actual API call
            // For now, simulating with a timeout
            setTimeout(() => {

                const startIndex = (currentPage - 1) * propertiesPerPage;
                const paginatedProperties = featuredProperties.slice(startIndex, startIndex + propertiesPerPage);

                setProperties(featuredProperties);
                setTotalProperties(featuredProperties.length);
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setLoading(false);
        }
    };

    // Update URL with new filters
    const updateFiltersInURL = (newFilters, newPage, newSort) => {
        const queryParams = new URLSearchParams();

        // Add filters to query params
        if (newFilters.country) queryParams.set('country', newFilters.country);
        if (newFilters.division) queryParams.set('division', newFilters.division);
        if (newFilters.district) queryParams.set('district', newFilters.district);
        if (newFilters.propertyType) queryParams.set('propertyType', newFilters.propertyType);
        if (newFilters.purpose) queryParams.set('purpose', newFilters.purpose);
        if (newFilters.minPrice) queryParams.set('minPrice', newFilters.minPrice);
        if (newFilters.maxPrice) queryParams.set('maxPrice', newFilters.maxPrice);
        if (newFilters.bedrooms) queryParams.set('bedrooms', newFilters.bedrooms);
        if (newFilters.bathrooms) queryParams.set('bathrooms', newFilters.bathrooms);

        // Add pagination and sort
        queryParams.set('page', newPage.toString());
        queryParams.set('sort', newSort);

        // Update URL
        navigate({
            pathname: location.pathname,
            search: queryParams.toString()
        });
    };

    // Handle filter changes
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
    };

    // Apply filters
    const applyFilters = () => {
        setPage(1); // Reset to page 1 when filters change
        updateFiltersInURL(filters, 1, sortBy);
    };

    // Handle sort change
    const handleSortChange = (event) => {
        const newSort = event.target.value;
        setSortBy(newSort);
        updateFiltersInURL(filters, page, newSort);
    };

    // Handle page change
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        updateFiltersInURL(filters, newPage, sortBy);
    };

    // Handle property card click
    const handleCardClick = (property) => {
        setSelectedProperty(property);
        setModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Calculate total pages
    const totalPages = Math.ceil(totalProperties / propertiesPerPage);

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
                        href="/"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Home
                    </Link>
                    <Typography color="text.primary">Property Listings</Typography>
                </Breadcrumbs>

                {/* Page Title */}
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        position: 'relative',
                        mb: 4,
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: 0,
                            width: 80,
                            height: 4,
                            backgroundColor: 'primary.main',
                        }
                    }}
                >
                    Property Listings
                </Typography>

                <Grid container spacing={3}>
                    {/* Filters Section */}
                    <Grid item xs={12} md={3}>
                        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <FilterListIcon sx={{ mr: 1 }} />
                                Filters
                            </Typography>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Purpose</InputLabel>
                                <Select
                                    name="purpose"
                                    value={filters.purpose}
                                    label="Purpose"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="rent">For Rent</MenuItem>
                                    <MenuItem value="sell">For Sale</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    name="country"
                                    value={filters.country}
                                    label="Country"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">All Countries</MenuItem>
                                    <MenuItem value="USA">USA</MenuItem>
                                    <MenuItem value="Canada">Canada</MenuItem>
                                    <MenuItem value="UK">UK</MenuItem>
                                    {/* Add more countries as needed */}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Division</InputLabel>
                                <Select
                                    name="division"
                                    value={filters.division}
                                    label="Division"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">All Divisions</MenuItem>
                                    <MenuItem value="North">North</MenuItem>
                                    <MenuItem value="South">South</MenuItem>
                                    <MenuItem value="East">East</MenuItem>
                                    <MenuItem value="West">West</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>District</InputLabel>
                                <Select
                                    name="district"
                                    value={filters.district}
                                    label="District"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">All Districts</MenuItem>
                                    <MenuItem value="District1">District 1</MenuItem>
                                    <MenuItem value="District2">District 2</MenuItem>
                                    <MenuItem value="District3">District 3</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Property Type</InputLabel>
                                <Select
                                    name="propertyType"
                                    value={filters.propertyType}
                                    label="Property Type"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">All Types</MenuItem>
                                    <MenuItem value="Apartment">Apartment</MenuItem>
                                    <MenuItem value="House">House</MenuItem>
                                    <MenuItem value="Villa">Villa</MenuItem>
                                    <MenuItem value="Condo">Condo</MenuItem>
                                </Select>
                            </FormControl>



                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Min Price"
                                        name="minPrice"
                                        type="number"
                                        value={filters.minPrice}
                                        onChange={handleFilterChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Max Price"
                                        name="maxPrice"
                                        type="number"
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Bedrooms</InputLabel>
                                <Select
                                    name="bedrooms"
                                    value={filters.bedrooms}
                                    label="Bedrooms"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">Any</MenuItem>
                                    <MenuItem value="1">1+</MenuItem>
                                    <MenuItem value="2">2+</MenuItem>
                                    <MenuItem value="3">3+</MenuItem>
                                    <MenuItem value="4">4+</MenuItem>
                                    <MenuItem value="5">5+</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Bathrooms</InputLabel>
                                <Select
                                    name="bathrooms"
                                    value={filters.bathrooms}
                                    label="Bathrooms"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="">Any</MenuItem>
                                    <MenuItem value="1">1+</MenuItem>
                                    <MenuItem value="2">2+</MenuItem>
                                    <MenuItem value="3">3+</MenuItem>
                                    <MenuItem value="4">4+</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={applyFilters}
                                sx={{ mt: 1 }}
                            >
                                Apply Filters
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Property Listings */}
                    <Grid item xs={12} md={9}>
                        {/* Sorting and Results Count */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="body1">
                                Showing {properties.length} of {totalProperties} properties
                            </Typography>

                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel id="sort-label">Sort By</InputLabel>
                                <Select
                                    labelId="sort-label"
                                    value={sortBy}
                                    label="Sort By"
                                    onChange={handleSortChange}
                                    size="small"
                                    startAdornment={<SortIcon sx={{ mr: 1 }} />}
                                >
                                    <MenuItem value="newest">Newest First</MenuItem>
                                    <MenuItem value="oldest">Oldest First</MenuItem>
                                    <MenuItem value="price_low">Price: Low to High</MenuItem>
                                    <MenuItem value="price_high">Price: High to Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Loading State */}
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                {/* Properties Grid */}
                                <Grid container spacing={3}>
                                    {properties.map((property) => (
                                        <Grid item xs={12} sm={6} md={4} lg={4} key={property.id}>
                                            {/* Use the PropertyCard component without the Featured chip */}
                                            <PropertyCard
                                                property={{
                                                    ...property,
                                                    // Include any additional properties needed by the card
                                                }}
                                                onCardClick={handleCardClick}
                                                hideFeaturedBadge={true} // Assuming we add this prop to hide the featured badge
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* No Results */}
                                {properties.length === 0 && !loading && (
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <Typography variant="h6">No properties found matching your criteria</Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                            Try adjusting your filters to see more results
                                        </Typography>
                                    </Box>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                        <Pagination
                                            count={totalPages}
                                            page={page}
                                            onChange={handlePageChange}
                                            color="primary"
                                            size="large"
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>

                {/* Property Details Modal */}
                <PropertyDetailsModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    property={selectedProperty}
                />
            </Container>
        </RootLayout>
    );
};

export default PropertyListingPage;