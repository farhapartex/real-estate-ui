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
} from '@mui/material';

const PropertySearchForm = ({
    countries = ['USA', 'Canada', 'UK', 'Australia'],
    divisions = ['Division 1', 'Division 2', 'Division 3'],
    districts = ['District 1', 'District 2', 'District 3'],
    propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Villa']
}) => {
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
                width: '100vw',
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '',
                padding: { xs: '40px 16px', md: '60px 0', opacity: '0.899999999' },
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: '80%',
                    margin: '0 auto',
                    padding: { xs: 3, md: 5 },
                    borderRadius: 2,
                }}
            >
                {/* Transaction Type Radio Group */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
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
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
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

                        <Grid item xs={12} sm={3}>
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

                        <Grid item xs={12} sm={3}>
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

                        <Grid item xs={12} sm={3}>
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

                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type="submit"
                                sx={{
                                    minWidth: 200,
                                    borderRadius: 28,
                                    py: 1.5
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