import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Tabs,
    Tab,
    Breadcrumbs,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Delete as DeleteIcon,
    ArrowBack as ArrowBackIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link as RouterLink } from 'react-router';

// Import mock data (in a real app, this would be fetched from an API)
// You'll need to create a separate file for this data
import { mockProperty, propertyTypes, countries, divisionsByCountry, districtsByDivision } from '../../propertyMockData';
import RootLayout from '../../layouts/RootLayout';
import PropertyBasicInfoTab from '../../components/owner/PropertyBasicInfoTab';
import PropertyBasicInfoForm from '../../components/owner/PropertyBasicInfoTab';
import PropertyFeaturesForm from '../../components/owner/PropertyFeaturesTab';
import PropertyPhotosForm from '../../components/owner/PropertyPhotosForm';
import { locationService } from '../../api/location';
import { propertyService } from '../../api/property';

// These would typically be imported from separate files
const PropertyBasicInfoTabUI = ({ property, isEditMode, handleChange }) => (
    // <Typography>Basic info content would go here</Typography>
    <PropertyBasicInfoTab></PropertyBasicInfoTab>
);

const PropertyFeaturesTab = ({ property, isEditMode, handleChange }) => (
    <Typography>Features content would go here</Typography>
);

const PropertyPhotosTab = ({ property, isEditMode, handleChange }) => (
    <Typography>Photos content would go here</Typography>
);

const PropertyEditViewPage = () => {
    const { id, mode } = useParams();
    const navigate = useNavigate();
    const isEditMode = mode === 'edit' || id === 'new';
    const isNewProperty = id === 'new';

    // Initialize property state
    // State for property data
    const [property, setProperty] = useState(isNewProperty ? {
        title: '',
        description: '',
        price: 0,
        purpose: 'sell',
        address: '',
        country_id: '',
        division_id: '',
        district_id: '',
        property_type: '',
        bedrooms: 0,
        bathrooms: 0,
        size: 0,
        built_year: '',
        status: 'Draft'
    } : mockProperty);
    const [propertyFeature, setPropertyFeature] = useState({
        features: [],
        amenities: {
            airConditioning: false,
            heating: false,
            furnished: false,
            petsAllowed: false,
            washerDryer: false,
            inUnitLaundry: false,
            elevator: false,
            outdoorSpace: false,
            balcony: false,
            disabilityAccess: false,
            hardwoodFloors: false,
            fireplace: false,
            pool: false,
            gym: false,
            parking: 0,
            garages: 0,
            ceilingHeight: 0,
            lotSize: 0

        },
        securityFeature: {
            securitySystem: false,
            doorman: false,
            securityCamera: false,
            gatedCommunity: false,
            fireAlarm: false,
        },
        technologyFeature: {
            internetWifi: false,
            smartHome: false,
            dishwasher: false,
            garbageDisposal: false,
            cableTV: false,
            refrigerator: false,
            microwave: false,
            stoveOven: false,
            ceilingFans: false,
        },
        luxaryFeature: {
            fireplace: false,
            pool: false,
            gym: false,
            walkInClosets: false,
            jacuzzi: false,
            sauna: false
        },
        communityFeature: {
            concierge: false,
            businessCenter: false,
            conferenceRoom: false,
            guestParking: false,
            playground: false,
            bbqArea: false,
            communityGarden: false,
            tennisCourt: false, basketballCourt: false,
            basketballCourt: false,
        },
        utilsFeature: {
            waterIncluded: false,
            gasIncluded: false,
            electricityIncluded: false,
            trashRemocalIncluded: false,
            internetIncluded: false,
        },
        energyFeature: {
            solarPanels: false,
            energyEfficientAppliances: false,
            greenCertification: false,
            evCharging: false,
            rainwaterHarvesting: false,
            programmableThermostat: false,
        }
    });

    // UI state
    const [tabValue, setTabValue] = useState(0);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [featureInput, setFeatureInput] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState(null);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [divisionId, setDivisionId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const fetchCountries = async () => {
        try {
            const result = await locationService.getPublicCountries(page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                const formattedData = data.map(country => ({
                    id: country.id,
                    name: country.name,
                    code: country.code
                }));
                setCountries(formattedData);

            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
        }
    }

    const fetchDivisions = async () => {

        try {
            const result = await locationService.getDivisionsByCountry(countryId, page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                const formattedData = data ? data.map(division => ({
                    id: division.id,
                    name: division.name,
                })) : [];
                setDivisions(formattedData);

            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setDistricts([]); // Reset districts when country changes
            setDivisionId(null); // Reset division ID when country changes
        }
    }

    const fetchDistrics = async () => {

        try {
            const result = await locationService.getDistrictByDivision(divisionId, page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                const formattedData = data ? data.map(district => ({
                    id: district.id,
                    name: district.name,
                })) : [];
                setDistricts(formattedData);

            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
        }
    }

    useEffect(() => {
        fetchCountries();
    }, [page, pageSize]);

    useEffect(() => {
        if (countryId) {
            fetchDivisions();
        }
    }, [countryId]);

    useEffect(() => {
        if (divisionId) {
            fetchDistrics();
        }
    }, [divisionId]);

    // Effect to update divisions when country changes
    useEffect(() => {
        if (property.country) {
            setDivisions(divisionsByCountry[property.country] || []);
            // Clear division and district if country changes
            if (!divisionsByCountry[property.country]?.includes(property.division)) {
                setProperty(prev => ({
                    ...prev,
                    division: '',
                    district: ''
                }));
                setDistricts([]);
            }
        } else {
            setDivisions([]);
            setDistricts([]);
        }
    }, [property.country_id]);

    useEffect(() => {
        if (property.division) {
            setDistricts(districtsByDivision[property.division] || []);
            // Clear district if division changes
            if (!districtsByDivision[property.division]?.includes(property.district)) {
                setProperty(prev => ({
                    ...prev,
                    district: ''
                }));
            }
        } else {
            setDistricts([]);
        }
    }, [property.division_id]);

    // Handle tab change
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == 'division_id') {
            setDivisionId(value);
        } else if (name == 'district_id') {
            setDistrictId(value);
        } else if (name == 'country_id') {
            setCountryId(value);
        }
        setProperty(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle number input change
    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        // Only allow numbers or empty string
        if (value === '' || /^\d+$/.test(value)) {
            setProperty(prev => ({
                ...prev,
                [name]: parseInt(value)
            }));
        }
    };

    // Handle price input change
    const handlePriceChange = (e) => {
        const { value } = e.target;
        // Allow numbers, empty string, or numbers with decimal point
        if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
            setProperty(prev => ({
                ...prev,
                price: parseFloat(value)
            }));
        }
    };

    const handleAmenityChange = (e) => {
        const { name, checked } = e.target;
        setProperty(prev => ({
            ...prev,
            amenities: {
                ...prev.amenities,
                [name]: checked
            }
        }));
    };

    // Handle parking spots change
    const handleParkingChange = (e) => {
        const { value } = e.target;
        // Only allow numbers or empty string
        if (value === '' || /^\d+$/.test(value)) {
            setProperty(prev => ({
                ...prev,
                amenities: {
                    ...prev.amenities,
                    parking: value
                }
            }));
        }
    };

    const handleGarageChange = (e) => {
        const { value } = e.target;
        // Only allow numbers or empty string
        if (value === '' || /^\d+$/.test(value)) {
            setProperty(prev => ({
                ...prev,
                amenities: {
                    ...prev.amenities,
                    garages: value
                }
            }));
        }
    };

    const handleCeilingHeightChange = (e) => {
        const { value } = e.target;
        // Only allow numbers or empty string
        if (value === '' || /^\d+$/.test(value)) {
            setProperty(prev => ({
                ...prev,
                amenities: {
                    ...prev.amenities,
                    ceilingHeight: value
                }
            }));
        }
    };

    const handleLotSizeChange = (e) => {
        const { value } = e.target;
        // Only allow numbers or empty string
        if (value === '' || /^\d+$/.test(value)) {
            setProperty(prev => ({
                ...prev,
                amenities: {
                    ...prev.amenities,
                    lotSize: value
                }
            }));
        }
    };


    const handleAddFeature = () => {
        if (featureInput && !property.features.includes(featureInput)) {
            setProperty(prev => ({
                ...prev,
                features: [...prev.features, featureInput]
            }));
            setFeatureInput('');
        }
    };

    // Handle removing a feature
    const handleRemoveFeature = (featureToRemove) => {
        setProperty(prev => ({
            ...prev,
            features: prev.features.filter(feature => feature !== featureToRemove)
        }));
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        // In a real app, you would handle file upload to a server
        // For this example, we'll simulate adding image URLs
        if (e.target.files) {
            const newImages = [...property.images];
            for (let i = 0; i < e.target.files.length; i++) {
                // In a real app, this would be the URL returned from your upload service
                // For demo purposes, we're adding a random unsplash image
                const randomId = Math.floor(Math.random() * 1000);
                newImages.push(`https://source.unsplash.com/random/800x600/?property,${randomId}`);
            }
            setProperty(prev => ({
                ...prev,
                images: newImages
            }));
        }
    };

    // Handle removing an image
    const handleRemoveImage = (indexToRemove) => {
        setProperty(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    // Handle save property
    const handleSaveProperty = () => {
        // In a real app, you would save the property to a database
        console.log('Saving property:', property);
        setSnackbar({
            open: true,
            message: isNewProperty ? 'Property created successfully!' : 'Property updated successfully!',
            severity: 'success'
        });

        // Navigate back to the properties list after a short delay
        setTimeout(() => {
            navigate('/owner/properties');
        }, 2000);
    };

    // Handle edit mode toggle
    const handleEditModeToggle = () => {
        navigate(`/owner/properties/${id}${isEditMode ? '' : '/edit'}`);
    };

    // Handle property change
    const handlePropertyChange = (e) => {
        const { name, value } = e.target;
        setProperty(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const createProperty = async () => {
        try {
            const result = await propertyService.createOwnerProperty(property);

            const { success, response } = result;

            if (success) {
                setTabValue(1);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
        }
    }

    // Handle save
    const handleSave = () => {
        // In a real app, you would save to a database
        if (tabValue === 0) {
            createProperty();
            return;
        } else if (tabValue === 1) {
            setTabValue(2);
            return;
        }

        setSnackbar({
            open: true,
            message: isNewProperty ? 'Property created successfully!' : 'Property updated successfully!',
            severity: 'success'
        });

        // Navigate back after successful save
        setTimeout(() => {
            navigate('/owner/properties');
        }, 1500);
    };

    // Handle delete dialog open
    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    // Handle delete property
    const handleDeleteProperty = () => {
        // In a real app, you would delete from a database
        console.log('Deleting property:', id);
        setDeleteDialogOpen(false);

        setSnackbar({
            open: true,
            message: 'Property deleted successfully!',
            severity: 'success'
        });

        // Navigate back after successful delete
        setTimeout(() => {
            navigate('/owner/properties');
        }, 1500);
    };

    const handleSnackbarClose = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    // Handle cancel
    const handleCancel = () => {
        if (isNewProperty) {
            navigate('/owner/properties');
        } else {
            navigate(`/owner/properties/${id}`);
        }
    };

    return (
        <RootLayout>
            <Container maxWidth="xl" sx={{ py: 4 }}>
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
                    <Link
                        underline="hover"
                        color="inherit"
                        component={RouterLink}
                        to="/owner/properties"
                    >
                        My Properties
                    </Link>
                    <Typography color="text.primary">
                        {isNewProperty ? 'Add New Property' : isEditMode ? 'Edit Property' : 'View Property'}
                    </Typography>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        {isNewProperty ? 'Add New Property' : isEditMode ? 'Edit Property' : property.title}
                    </Typography>

                    <Box>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            component={RouterLink}
                            to="/owner/properties"
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>

                        {!isNewProperty && !isEditMode && (
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                onClick={handleEditModeToggle}
                            >
                                Edit
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="property details tabs"
                    >
                        <Tab label="Basic Information" />
                        <Tab label="Features & Amenities" />
                        <Tab label="Photos" />
                    </Tabs>
                </Box>

                {/* Tab Panels */}
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                    {tabValue === 0 && (
                        <PropertyBasicInfoForm
                            property={property}
                            handleInputChange={handleInputChange}
                            handlePriceChange={handlePriceChange}
                            handleNumberChange={handleNumberChange}
                            isEditMode={isEditMode}
                            countries={countries}
                            divisions={divisions}
                            districts={districts}
                            propertyTypes={propertyTypes}
                        />
                    )}

                    {tabValue === 1 && (
                        <PropertyFeaturesForm
                            propertyFeature={propertyFeature}
                            featureInput={featureInput}
                            setFeatureInput={setFeatureInput}
                            handleAddFeature={handleAddFeature}
                            handleRemoveFeature={handleRemoveFeature}
                            handleAmenityChange={handleAmenityChange}
                            handleParkingChange={handleParkingChange}
                            handleGarageChange={handleGarageChange}
                            handleCeilingHeightChange={handleCeilingHeightChange}
                            handleLotSizeChange={handleLotSizeChange}
                            isEditMode={isEditMode}
                        />
                    )}

                    {tabValue === 2 && (
                        <PropertyPhotosForm
                            property={property}
                            handleImageUpload={handleImageUpload}
                            handleRemoveImage={handleRemoveImage}
                        />
                    )}
                </Paper>

                {/* Action Buttons (only in edit mode) */}
                {isEditMode && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Box>
                            {!isNewProperty && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDeleteDialogOpen}
                                >
                                    Delete Property
                                </Button>
                            )}
                        </Box>

                        <Box>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                sx={{ mr: 1 }}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                startIcon={tabValue == 2 ? <SaveIcon /> : null}
                                endIcon={tabValue < 2 ? <KeyboardArrowRightIcon /> : null}
                                onClick={handleSave}
                            >
                                {isNewProperty ? tabValue < 2 ? 'Next' : 'Create Property' : 'Save Changes'}
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>Delete Property</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this property? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleDeleteProperty} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        severity={snackbar.severity}
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </RootLayout>
    );
};

export default PropertyEditViewPage;