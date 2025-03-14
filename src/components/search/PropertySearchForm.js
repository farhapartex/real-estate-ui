import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Paper,
    RadioGroup,
    Radio,
    FormControlLabel,
    Typography,
    Grid,
    useMediaQuery,
    useTheme,
    TextField,
    Slider,
    InputAdornment
} from '@mui/material';

const PropertySearchForm = ({
    countries = ['USA', 'Canada', 'UK', 'Australia'],
    divisions = ['Division 1', 'Division 2', 'Division 3'],
    districts = ['District 1', 'District 2', 'District 3'],
    propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Villa']
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // State for form values
    const [formValues, setFormValues] = useState({
        purpose: 'rent', // changed from transactionType to match property listing page
        country: '',
        division: '',
        district: '',
        propertyType: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: ''
    });

    // State to track if form is valid
    const [isFormValid, setIsFormValid] = useState(false);

    // Check form validity whenever formValues change
    useEffect(() => {
        // Check if at least one field has a value
        const hasValue = Object.entries(formValues).some(([key, value]) => {
            // Skip the purpose field as it has a default value
            if (key === 'purpose') return false;
            return value !== '';
        });

        setIsFormValid(hasValue);
    }, [formValues]);

    // Handle change for all form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    // Handle number inputs to ensure they're valid
    const handleNumberChange = (event) => {
        const { name, value } = event.target;
        // Only allow numbers or empty string
        if (value === '' || /^\d+$/.test(value)) {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Create query parameters
        const queryParams = new URLSearchParams();

        // Add non-empty values to query params
        Object.entries(formValues).forEach(([key, value]) => {
            if (value !== '') {
                queryParams.set(key, value);
            }
        });

        // Navigate to property listing page with query params
        navigate({
            pathname: '/properties',
            search: queryParams.toString()
        });
    };

    return (
        <Box
            sx={{
                width: '100%',
                position: 'relative',
                backgroundColor: '',
                padding: { xs: '20px 10px', md: '40px 0' },
                opacity: '0.899999999',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: { xs: '100%', sm: '100%', md: '80%' },
                    maxWidth: { xs: '100%', sm: '100%', md: '80%' },
                    margin: '0 auto',
                    padding: { xs: 2, sm: 3, md: 5 },
                    borderRadius: 2,
                }}
            >
                {/* Transaction Type Radio Group */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
                        Find your #Ghor easily!
                    </Typography>
                    <RadioGroup
                        row
                        name="purpose"
                        value={formValues.purpose}
                        onChange={handleChange}
                        sx={{ justifyContent: 'center' }}
                    >
                        <FormControlLabel
                            value="rent"
                            control={<Radio />}
                            label="Rent"
                        />
                        <FormControlLabel
                            value="sell"
                            control={<Radio />}
                            label="Buy"
                        />
                    </RadioGroup>
                </Box>

                {/* Form Fields */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={isMobile ? 2 : 3}>
                        {/* First row - Location and property type */}
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    name="country"
                                    value={formValues.country}
                                    onChange={handleChange}
                                    label="Country"
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    {countries.map((country) => (
                                        <MenuItem key={country} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Division</InputLabel>
                                <Select
                                    name="division"
                                    value={formValues.division}
                                    onChange={handleChange}
                                    label="Division"
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    {divisions.map((division) => (
                                        <MenuItem key={division} value={division}>
                                            {division}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>District</InputLabel>
                                <Select
                                    name="district"
                                    value={formValues.district}
                                    onChange={handleChange}
                                    label="District"
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    {districts.map((district) => (
                                        <MenuItem key={district} value={district}>
                                            {district}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Property Type</InputLabel>
                                <Select
                                    name="propertyType"
                                    value={formValues.propertyType}
                                    onChange={handleChange}
                                    label="Property Type"
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    {propertyTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Second row - Price range and bedrooms/bathrooms */}
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="Min Price"
                                name="minPrice"
                                value={formValues.minPrice}
                                onChange={handleNumberChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="Max Price"
                                name="maxPrice"
                                value={formValues.maxPrice}
                                onChange={handleNumberChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Bedrooms</InputLabel>
                                <Select
                                    name="bedrooms"
                                    value={formValues.bedrooms}
                                    onChange={handleChange}
                                    label="Bedrooms"
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value="1">1+</MenuItem>
                                    <MenuItem value="2">2+</MenuItem>
                                    <MenuItem value="3">3+</MenuItem>
                                    <MenuItem value="4">4+</MenuItem>
                                    <MenuItem value="5">5+</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Bathrooms</InputLabel>
                                <Select
                                    name="bathrooms"
                                    value={formValues.bathrooms}
                                    onChange={handleChange}
                                    label="Bathrooms"
                                >
                                    <MenuItem value="">
                                        <em>Any</em>
                                    </MenuItem>
                                    <MenuItem value="1">1+</MenuItem>
                                    <MenuItem value="2">2+</MenuItem>
                                    <MenuItem value="3">3+</MenuItem>
                                    <MenuItem value="4">4+</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center', mt: { xs: 1, sm: 2 } }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size={isMobile ? "medium" : "large"}
                                type="submit"
                                disabled={!isFormValid}
                                sx={{
                                    minWidth: { xs: 150, sm: 200 },
                                    borderRadius: 28,
                                    py: { xs: 1, sm: 1.5 }
                                }}
                            >
                                Search Properties
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default PropertySearchForm;