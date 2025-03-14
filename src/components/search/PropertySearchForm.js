import React, { useState } from 'react';
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
    useTheme
} from '@mui/material';

const PropertySearchForm = ({
    countries = ['USA', 'Canada', 'UK', 'Australia'],
    divisions = ['Division 1', 'Division 2', 'Division 3'],
    districts = ['District 1', 'District 2', 'District 3'],
    propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Villa']
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // State for form values
    const [formValues, setFormValues] = useState({
        transactionType: 'rent',
        country: '',
        division: '',
        district: '',
        propertyType: ''
    });

    // Handle change for all form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formValues);
        // Add your submission logic here
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
                        name="transactionType"
                        value={formValues.transactionType}
                        onChange={handleChange}
                        sx={{ justifyContent: 'center' }}
                    >
                        <FormControlLabel
                            value="rent"
                            control={<Radio />}
                            label="Rent"
                        />
                        <FormControlLabel
                            value="buy"
                            control={<Radio />}
                            label="Buy"
                        />
                    </RadioGroup>
                </Box>

                {/* Form Fields */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={isMobile ? 2 : 3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    name="country"
                                    value={formValues.country}
                                    onChange={handleChange}
                                    label="Country"
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Division</InputLabel>
                                <Select
                                    name="division"
                                    value={formValues.division}
                                    onChange={handleChange}
                                    label="Division"
                                >
                                    {divisions.map((division) => (
                                        <MenuItem key={division} value={division}>
                                            {division}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>District</InputLabel>
                                <Select
                                    name="district"
                                    value={formValues.district}
                                    onChange={handleChange}
                                    label="District"
                                >
                                    {districts.map((district) => (
                                        <MenuItem key={district} value={district}>
                                            {district}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth required>
                                <InputLabel>Property Type</InputLabel>
                                <Select
                                    name="propertyType"
                                    value={formValues.propertyType}
                                    onChange={handleChange}
                                    label="Property Type"
                                >
                                    {propertyTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center', mt: { xs: 1, sm: 2 } }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size={isMobile ? "medium" : "large"}
                                type="submit"
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