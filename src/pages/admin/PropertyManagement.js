// File: PropertyManagement.jsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Snackbar,
    Alert,
    Tab,
    Tabs,
    Paper
} from '@mui/material';
import {
    Refresh as RefreshIcon,
    Add as AddIcon
} from '@mui/icons-material';


import { mockProperties } from '../../adminMockProperties';
import PropertyFilters from '../../components/admin/property/PropertyFilters';
import BulkActionsMenu from '../../components/admin/property/BulkActionsMenu';
import PropertyTable from '../../components/admin/property/PropertyTable';
import PropertyDetailsDialog from '../../components/admin/property/PropertyDetailsDialog';
import AdminLayout from '../../layouts/AdminLayout';

const PropertyManagement = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Define tabs based on property status
    const tabs = [
        { label: 'All Properties', value: 'all' },
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Featured', value: 'featured' },
        { label: 'Flagged', value: 'flagged' },
        { label: 'Inactive', value: 'inactive' }
    ];

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setProperties(mockProperties);
            setFilteredProperties(mockProperties);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, statusFilter, typeFilter, featuredFilter, selectedTab, properties]);

    const applyFilters = () => {
        let filtered = [...properties];

        // Apply tab filter
        if (selectedTab > 0) { // First tab is "All Properties"
            const tabValue = tabs[selectedTab].value;
            if (tabValue === 'featured') {
                filtered = filtered.filter(property => property.featured);
            } else if (tabValue === 'flagged') {
                filtered = filtered.filter(property => property.flagged);
            } else {
                filtered = filtered.filter(property => property.status === tabValue);
            }
        }

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(term) ||
                property.address.toLowerCase().includes(term) ||
                property.owner.name.toLowerCase().includes(term)
            );
        }

        // Apply status filter (if not already filtered by tab)
        if (statusFilter !== 'all' && selectedTab === 0) {
            filtered = filtered.filter(property => property.status === statusFilter);
        }

        // Apply type filter
        if (typeFilter !== 'all') {
            filtered = filtered.filter(property => property.type === typeFilter);
        }

        // Apply featured filter (if not already filtered by tab)
        if (featuredFilter !== 'all' && selectedTab !== 3) {
            const isFeatured = featuredFilter === 'featured';
            filtered = filtered.filter(property => property.featured === isFeatured);
        }

        setFilteredProperties(filtered);
        setPage(0); // Reset to first page when filters change
        setSelectedProperties([]); // Clear selections when filters change
    };

    const handleRefresh = () => {
        setLoading(true);
        // In a real application, this would fetch fresh data from the API
        setTimeout(() => {
            setProperties(mockProperties);
            setFilteredProperties(mockProperties);
            setLoading(false);
        }, 1000);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenPropertyDetails = (property) => {
        setSelectedProperty(property);
        setOpenDetailsDialog(true);
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        // Reset other filters when changing tabs
        setStatusFilter('all');
        setFeaturedFilter('all');
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setTypeFilter('all');
        setFeaturedFilter('all');
        setSelectedTab(0);
    };

    const handlePropertySelection = (propertyId) => {
        setSelectedProperties(prev => {
            if (prev.includes(propertyId)) {
                return prev.filter(id => id !== propertyId);
            } else {
                return [...prev, propertyId];
            }
        });
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const currentPageIds = filteredProperties
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(property => property.id);
            setSelectedProperties(currentPageIds);
        } else {
            setSelectedProperties([]);
        }
    };

    const handleApproveProperty = (propertyId) => {
        const updatedProperties = properties.map(property =>
            property.id === propertyId ? { ...property, status: 'active' } : property
        );

        setProperties(updatedProperties);

        if (selectedProperty && selectedProperty.id === propertyId) {
            setSelectedProperty({ ...selectedProperty, status: 'active' });
        }

        setSnackbar({
            open: true,
            message: 'Property has been approved',
            severity: 'success'
        });
    };

    const handleFeatureProperty = (propertyId, currentFeatured) => {
        const updatedProperties = properties.map(property =>
            property.id === propertyId ? { ...property, featured: !currentFeatured } : property
        );

        setProperties(updatedProperties);

        if (selectedProperty && selectedProperty.id === propertyId) {
            setSelectedProperty({ ...selectedProperty, featured: !currentFeatured });
        }

        setSnackbar({
            open: true,
            message: currentFeatured ? 'Property unfeatured' : 'Property featured',
            severity: 'success'
        });
    };

    const handleFlagProperty = (propertyId, currentFlagged) => {
        const updatedProperties = properties.map(property =>
            property.id === propertyId ? { ...property, flagged: !currentFlagged } : property
        );

        setProperties(updatedProperties);

        if (selectedProperty && selectedProperty.id === propertyId) {
            setSelectedProperty({ ...selectedProperty, flagged: !currentFlagged });
        }

        setSnackbar({
            open: true,
            message: currentFlagged ? 'Flag removed from property' : 'Property flagged',
            severity: 'success'
        });
    };

    const handleBulkAction = (action) => {
        let updatedProperties = [...properties];
        let message = '';

        switch (action) {
            case 'approve':
                updatedProperties = properties.map(property =>
                    selectedProperties.includes(property.id) ? { ...property, status: 'active' } : property
                );
                message = 'Selected properties have been approved';
                break;
            case 'feature':
                updatedProperties = properties.map(property =>
                    selectedProperties.includes(property.id) ? { ...property, featured: true } : property
                );
                message = 'Selected properties have been featured';
                break;
            case 'unfeature':
                updatedProperties = properties.map(property =>
                    selectedProperties.includes(property.id) ? { ...property, featured: false } : property
                );
                message = 'Selected properties have been unfeatured';
                break;
            case 'flag':
                updatedProperties = properties.map(property =>
                    selectedProperties.includes(property.id) ? { ...property, flagged: true } : property
                );
                message = 'Selected properties have been flagged';
                break;
            case 'unflag':
                updatedProperties = properties.map(property =>
                    selectedProperties.includes(property.id) ? { ...property, flagged: false } : property
                );
                message = 'Flags have been removed from selected properties';
                break;
            case 'activate':
                updatedProperties = properties.map(property =>
                    selectedProperties.includes(property.id) ? { ...property, status: 'active' } : property
                );
                message = 'Selected properties have been activated';
                break;
            case 'deactivate':
                updatedProperties = properties.map(property =>
                    selectedProperties.includes(property.id) ? { ...property, status: 'inactive' } : property
                );
                message = 'Selected properties have been deactivated';
                break;
            default:
                return;
        }

        setProperties(updatedProperties);
        setSelectedProperties([]);

        setSnackbar({
            open: true,
            message,
            severity: 'success'
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <AdminLayout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Property Management
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<RefreshIcon />}
                            onClick={handleRefresh}
                            disabled={loading}
                            sx={{ mr: 2 }}
                        >
                            Refresh
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                        >
                            Add Property
                        </Button>
                    </Box>
                </Box>

                {/* Tabs for quick filtering */}
                <Paper sx={{ mb: 3 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {tabs.map((tab, index) => (
                            <Tab key={index} label={tab.label} />
                        ))}
                    </Tabs>
                </Paper>

                {/* Filters Section */}
                <PropertyFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    featuredFilter={featuredFilter}
                    setFeaturedFilter={setFeaturedFilter}
                    handleResetFilters={handleResetFilters}
                    selectedTab={selectedTab}
                />

                {/* Bulk actions menu */}
                {selectedProperties.length > 0 && (
                    <BulkActionsMenu
                        selectedCount={selectedProperties.length}
                        onAction={handleBulkAction}
                    />
                )}

                {/* Property Table */}
                <PropertyTable
                    properties={filteredProperties}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleOpenPropertyDetails={handleOpenPropertyDetails}
                    handleApproveProperty={handleApproveProperty}
                    handleFeatureProperty={handleFeatureProperty}
                    handleFlagProperty={handleFlagProperty}
                    selectedProperties={selectedProperties}
                    handlePropertySelection={handlePropertySelection}
                    handleSelectAll={handleSelectAll}
                    loading={loading}
                />

                {/* Property Details Dialog */}
                {selectedProperty && (
                    <PropertyDetailsDialog
                        open={openDetailsDialog}
                        onClose={handleCloseDetailsDialog}
                        property={selectedProperty}
                        onApprove={handleApproveProperty}
                        onFeature={handleFeatureProperty}
                        onFlag={handleFlagProperty}
                    />
                )}

                {/* Notification Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </AdminLayout>

    );
};

export default PropertyManagement;