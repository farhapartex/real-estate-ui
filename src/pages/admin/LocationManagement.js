// File: LocationManagement.jsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Tabs,
    Tab,
    Button,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Refresh as RefreshIcon,
    Add as AddIcon
} from '@mui/icons-material';

// Import components
import CountryList from '../../components/admin/location/CountryList';
import DivisionList from '../../components/admin/location/DivisionList';
import DistrictList from '../../components/admin/location/DistrictList';
import AddLocationDialog from '../../components/admin/location/AddLocationDialog';
import EditLocationDialog from '../../components/admin/location/EditLocationDialog';
import DeleteConfirmDialog from '../../components/admin/location/DeleteConfirmDialog';

// Import mock data
import {
    mockCountries,
    mockDivisions,
    mockDistricts
} from '../../mockLocations';
import AdminLayout from '../../layouts/AdminLayout';

const LocationManagement = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [countries, setCountries] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Define tabs
    const tabs = [
        { label: 'Countries', value: 'country' },
        { label: 'Divisions', value: 'division' },
        { label: 'Districts', value: 'district' }
    ];

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setCountries(mockCountries);
            setDivisions(mockDivisions);
            setDistricts(mockDistricts);
            setLoading(false);
        }, 1000);
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        // In a real application, this would fetch fresh data from the API
        setTimeout(() => {
            setCountries(mockCountries);
            setDivisions(mockDivisions);
            setDistricts(mockDistricts);
            setLoading(false);
        }, 1000);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleAddClick = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setSelectedItem(null);
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedItem(null);
    };

    const handleAddLocation = (newLocation) => {
        const locationType = tabs[selectedTab].value;

        // Add the new location to the appropriate array
        switch (locationType) {
            case 'country':
                const newCountry = {
                    id: countries.length + 1,
                    name: newLocation.name,
                    code: newLocation.code,
                    active: true,
                    divisionsCount: 0
                };
                setCountries([...countries, newCountry]);
                break;
            case 'division':
                const newDivision = {
                    id: divisions.length + 1,
                    name: newLocation.name,
                    countryId: parseInt(newLocation.parentId),
                    countryName: countries.find(c => c.id === parseInt(newLocation.parentId))?.name || 'Unknown',
                    active: true,
                    districtsCount: 0
                };
                setDivisions([...divisions, newDivision]);

                // Update the divisionsCount for the parent country
                setCountries(countries.map(country =>
                    country.id === parseInt(newLocation.parentId)
                        ? { ...country, divisionsCount: country.divisionsCount + 1 }
                        : country
                ));
                break;
            case 'district':
                const selectedDivision = divisions.find(div => div.id === parseInt(newLocation.parentId));
                const newDistrict = {
                    id: districts.length + 1,
                    name: newLocation.name,
                    divisionId: parseInt(newLocation.parentId),
                    divisionName: selectedDivision?.name || 'Unknown',
                    countryId: selectedDivision?.countryId,
                    countryName: selectedDivision?.countryName || 'Unknown',
                    active: true
                };
                setDistricts([...districts, newDistrict]);

                // Update the districtsCount for the parent division
                setDivisions(divisions.map(division =>
                    division.id === parseInt(newLocation.parentId)
                        ? { ...division, districtsCount: division.districtsCount + 1 }
                        : division
                ));
                break;
            default:
                break;
        }

        setAddDialogOpen(false);
        setSnackbar({
            open: true,
            message: `New ${locationType} added successfully`,
            severity: 'success'
        });
    };

    const handleEditLocation = (updatedLocation) => {
        const locationType = tabs[selectedTab].value;

        // Update the location in the appropriate array
        switch (locationType) {
            case 'country':
                setCountries(countries.map(country =>
                    country.id === selectedItem.id
                        ? { ...country, name: updatedLocation.name, code: updatedLocation.code }
                        : country
                ));
                break;
            case 'division':
                // Check if parent country changed
                const oldCountryId = selectedItem.countryId;
                const newCountryId = parseInt(updatedLocation.parentId);
                const countryChanged = oldCountryId !== newCountryId;

                setDivisions(divisions.map(division =>
                    division.id === selectedItem.id
                        ? {
                            ...division,
                            name: updatedLocation.name,
                            countryId: newCountryId,
                            countryName: countries.find(c => c.id === newCountryId)?.name || 'Unknown'
                        }
                        : division
                ));

                // Update country division counts if parent changed
                if (countryChanged) {
                    setCountries(countries.map(country => {
                        if (country.id === oldCountryId) {
                            return { ...country, divisionsCount: Math.max(0, country.divisionsCount - 1) };
                        } else if (country.id === newCountryId) {
                            return { ...country, divisionsCount: country.divisionsCount + 1 };
                        }
                        return country;
                    }));
                }
                break;
            case 'district':
                // Check if parent division changed
                const oldDivisionId = selectedItem.divisionId;
                const newDivisionId = parseInt(updatedLocation.parentId);
                const divisionChanged = oldDivisionId !== newDivisionId;

                const newParentDivision = divisions.find(div => div.id === newDivisionId);

                setDistricts(districts.map(district =>
                    district.id === selectedItem.id
                        ? {
                            ...district,
                            name: updatedLocation.name,
                            divisionId: newDivisionId,
                            divisionName: newParentDivision?.name || 'Unknown',
                            countryId: newParentDivision?.countryId,
                            countryName: newParentDivision?.countryName || 'Unknown'
                        }
                        : district
                ));

                // Update division district counts if parent changed
                if (divisionChanged) {
                    setDivisions(divisions.map(division => {
                        if (division.id === oldDivisionId) {
                            return { ...division, districtsCount: Math.max(0, division.districtsCount - 1) };
                        } else if (division.id === newDivisionId) {
                            return { ...division, districtsCount: division.districtsCount + 1 };
                        }
                        return division;
                    }));
                }
                break;
            default:
                break;
        }

        setEditDialogOpen(false);
        setSelectedItem(null);
        setSnackbar({
            open: true,
            message: `${locationType.charAt(0).toUpperCase() + locationType.slice(1)} updated successfully`,
            severity: 'success'
        });
    };

    const handleDeleteLocation = () => {
        const locationType = tabs[selectedTab].value;

        // Delete the location from the appropriate array
        switch (locationType) {
            case 'country':
                // Check if country has divisions
                const hasChildren = divisions.some(division => division.countryId === selectedItem.id);

                if (hasChildren) {
                    setSnackbar({
                        open: true,
                        message: `Cannot delete country. Please delete its divisions first.`,
                        severity: 'error'
                    });
                    setDeleteDialogOpen(false);
                    setSelectedItem(null);
                    return;
                }

                setCountries(countries.filter(country => country.id !== selectedItem.id));
                break;
            case 'division':
                // Check if division has districts
                const hasDependentDistricts = districts.some(district => district.divisionId === selectedItem.id);

                if (hasDependentDistricts) {
                    setSnackbar({
                        open: true,
                        message: `Cannot delete division. Please delete its districts first.`,
                        severity: 'error'
                    });
                    setDeleteDialogOpen(false);
                    setSelectedItem(null);
                    return;
                }

                setDivisions(divisions.filter(division => division.id !== selectedItem.id));

                // Update country division count
                setCountries(countries.map(country =>
                    country.id === selectedItem.countryId
                        ? { ...country, divisionsCount: Math.max(0, country.divisionsCount - 1) }
                        : country
                ));
                break;
            case 'district':
                setDistricts(districts.filter(district => district.id !== selectedItem.id));

                // Update division district count
                setDivisions(divisions.map(division =>
                    division.id === selectedItem.divisionId
                        ? { ...division, districtsCount: Math.max(0, division.districtsCount - 1) }
                        : division
                ));
                break;
            default:
                break;
        }

        setDeleteDialogOpen(false);
        setSelectedItem(null);
        setSnackbar({
            open: true,
            message: `${locationType.charAt(0).toUpperCase() + locationType.slice(1)} deleted successfully`,
            severity: 'success'
        });
    };

    const handleToggleStatus = (item) => {
        const locationType = tabs[selectedTab].value;

        // Toggle the status in the appropriate array
        switch (locationType) {
            case 'country':
                setCountries(countries.map(country =>
                    country.id === item.id
                        ? { ...country, active: !country.active }
                        : country
                ));
                break;
            case 'division':
                setDivisions(divisions.map(division =>
                    division.id === item.id
                        ? { ...division, active: !division.active }
                        : division
                ));
                break;
            case 'district':
                setDistricts(districts.map(district =>
                    district.id === item.id
                        ? { ...district, active: !district.active }
                        : district
                ));
                break;
            default:
                break;
        }

        setSnackbar({
            open: true,
            message: `${locationType.charAt(0).toUpperCase() + locationType.slice(1)} status updated`,
            severity: 'success'
        });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <AdminLayout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Location Management
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
                            onClick={handleAddClick}
                        >
                            Add {tabs[selectedTab].value.charAt(0).toUpperCase() + tabs[selectedTab].value.slice(1)}
                        </Button>
                    </Box>
                </Box>

                {/* Tabs */}
                <Paper sx={{ mb: 3 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        {tabs.map((tab, index) => (
                            <Tab key={index} label={tab.label} />
                        ))}
                    </Tabs>
                </Paper>

                {/* Tab Contents */}
                {selectedTab === 0 && (
                    <CountryList
                        countries={countries}
                        loading={loading}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onToggleStatus={handleToggleStatus}
                    />
                )}

                {selectedTab === 1 && (
                    <DivisionList
                        divisions={divisions}
                        loading={loading}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onToggleStatus={handleToggleStatus}
                    />
                )}

                {selectedTab === 2 && (
                    <DistrictList
                        districts={districts}
                        loading={loading}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onToggleStatus={handleToggleStatus}
                    />
                )}

                {/* Add Location Dialog */}
                <AddLocationDialog
                    open={addDialogOpen}
                    onClose={handleCloseAddDialog}
                    onSubmit={handleAddLocation}
                    locationType={tabs[selectedTab].value}
                    countries={countries}
                    divisions={divisions}
                />

                {/* Edit Location Dialog */}
                {selectedItem && (
                    <EditLocationDialog
                        open={editDialogOpen}
                        onClose={handleCloseEditDialog}
                        onSubmit={handleEditLocation}
                        locationType={tabs[selectedTab].value}
                        location={selectedItem}
                        countries={countries}
                        divisions={divisions}
                    />
                )}

                {/* Delete Confirmation Dialog */}
                {selectedItem && (
                    <DeleteConfirmDialog
                        open={deleteDialogOpen}
                        onClose={handleCloseDeleteDialog}
                        onConfirm={handleDeleteLocation}
                        itemType={tabs[selectedTab].value}
                        itemName={selectedItem.name}
                    />
                )}

                {/* Snackbar for notifications */}
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

export default LocationManagement;