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
import { locationService } from '../../api/location';

const LocationManagement = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [countries, setCountries] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

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


    const fetchCountries = async () => {
        setLoading(true);

        try {
            const result = await locationService.countryList(page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                setLoading(false);
                const formattedData = data.map(country => ({
                    id: country.id,
                    name: country.name,
                    code: country.code,
                    status: country.status,
                    divisions: country.divisions
                }));
                setCountries(formattedData);
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
            setLoading(false);
        }
    }

    const fetchDivisions = async () => {
        setLoading(true);

        try {
            const result = await locationService.divisionList(page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                setLoading(false);
                const formattedData = data.map(division => ({
                    id: division.id,
                    name: division.name,
                    country: division.country,
                    status: division.status,
                    districts: division.districts
                }));
                setDivisions(formattedData);
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
            setLoading(false);
        }
    }

    const createCountry = async (newLocation) => {
        setLoading(true);

        try {
            const result = await locationService.createCountry(newLocation.name, newLocation.code);
            const { success, response } = result;
            if (success) {
                setCountries([...countries, response]);
            } else {
                setSnackbar({
                    open: true,
                    message: `An error occurred while creating country ${newLocation.name}`,
                    severity: 'error'
                });
            }

        } catch (error) {
            console.log(error)
            setSnackbar({
                open: true,
                message: `An error occurred while creating country ${newLocation.name}`,
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }

    }

    const createDivision = async (newLocation) => {
        setLoading(true);

        try {
            const result = await locationService.createDivision(newLocation.name, parseInt(newLocation.parentId));
            const { success, response } = result;
            if (success) {
                setDivisions([...divisions, response]);
            } else {
                setSnackbar({
                    open: true,
                    message: `An error occurred while creating division ${newLocation.name}`,
                    severity: 'error'
                });
            }

        } catch (error) {
            console.log(error)
            setSnackbar({
                open: true,
                message: `An error occurred while creating division ${newLocation.name}`,
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }

    }

    const updateCountry = async (id, validatedData) => {
        setLoading(true);
        try {
            const result = await locationService.updateCountry(id, validatedData);
            const { success, response } = result;
            if (success) {
                setCountries(countries.map(country =>
                    country.id === id
                        ? { ...country, name: response.name, code: response.code, status: response.status }
                        : country
                ));
            } else {
                setSnackbar({
                    open: true,
                    message: response?.error || "Failed to update country",
                    severity: 'error'
                });
            }
        } catch (error) {
            console.log(error)
            setSnackbar({
                open: true,
                message: "Failed to update country",
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    }

    const deleteCountry = async (id) => {
        setLoading(true);
        try {
            const result = await locationService.deleteCountry(id);
            const { success, response } = result;
            if (success) {
                setCountries(countries.filter(country => country.id !== id));
            } else {
                setSnackbar({
                    open: true,
                    message: response?.error || "Failed to delete country",
                    severity: 'error'
                });
            }
        } catch (error) {
            console.log(error)
            setSnackbar({
                open: true,
                message: "Failed to delete country",
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedTab === 0) {
            fetchCountries();
        } else {

        }
        setLoading(true);
        setTimeout(() => {
            if (selectedTab === 1) {
                fetchDivisions();
            } else if (selectedTab === 2) {
                setDistricts(mockDistricts);
            }
            setLoading(false);
        }, 1000);
    }, [selectedTab, page, pageSize]);

    const handleRefresh = () => {
        if (selectedTab === 0) {
            fetchCountries();
        } else {
            setLoading(true);
            setTimeout(() => {
                if (selectedTab === 1) {
                    fetchDivisions();
                } else if (selectedTab === 2) {
                    setDistricts(mockDistricts);
                }
                setLoading(false);
            }, 1000);
        }
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
                createCountry(newLocation);
                break;
            case 'division':
                // const newDivision = {
                //     id: divisions.length + 1,
                //     name: newLocation.name,
                //     countryId: parseInt(newLocation.parentId),
                //     countryName: countries.find(c => c.id === parseInt(newLocation.parentId))?.name || 'Unknown',
                //     active: true,
                //     districtsCount: 0
                // };
                createDivision(newLocation);
                //setDivisions([...divisions, newDivision]);

                // Update the divisionsCount for the parent country
                // setCountries(countries.map(country =>
                //     country.id === parseInt(newLocation.parentId)
                //         ? { ...country, divisionsCount: country.divisionsCount + 1 }
                //         : country
                // ));
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
                updateCountry(selectedItem.id, {
                    name: updatedLocation.name,
                    code: updatedLocation.code,
                    status: updatedLocation.status,
                })
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
                deleteCountry(selectedItem.id);
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
                // setCountries(countries.map(country =>
                //     country.id === item.id
                //         ? { ...country, active: !country.active }
                //         : country
                // ));
                updateCountry(item.id, { ...item, status: !item.status });
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