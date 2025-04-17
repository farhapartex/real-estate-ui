import React from 'react';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment
} from '@mui/material';

const PropertyBasicInfoForm = ({
    property,
    handleInputChange,
    handlePriceChange,
    handleNumberChange,
    isEditMode,
    countries,
    divisions,
    districts,
    propertyTypes
}) => {
    console.log(property);
    return (
        <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Property Title"
                    name="title"
                    value={property.title}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    required
                />
            </Grid>

            {/* Purpose */}
            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth required>
                    <InputLabel>Purpose</InputLabel>
                    <Select
                        name="purpose"
                        value={property.purpose}
                        onChange={handleInputChange}
                        label="Purpose"
                        disabled={!isEditMode}
                    >
                        <MenuItem value="rent">For Rent</MenuItem>
                        <MenuItem value="sale">For Sale</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={property.price}
                    onChange={handlePriceChange}
                    disabled={!isEditMode}
                    required
                    InputProps={{
                        startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                        endAdornment: property.purpose === 'rent' ? (
                            <InputAdornment position="end">/month</InputAdornment>
                        ) : null
                    }}
                />
            </Grid>

            {/* Status (only in edit mode) */}
            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={property.status}
                        onChange={handleInputChange}
                        label="Status"
                        disabled={true}
                    >
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="pending">Pending Approval</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {/* Property Type */}
            <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth required>
                    <InputLabel>Property Type</InputLabel>
                    <Select
                        name="property_type"
                        value={property.property_type}
                        onChange={handleInputChange}
                        label="Property Type"
                        disabled={!isEditMode}
                    >
                        {propertyTypes.map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Bedrooms */}
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    fullWidth
                    label="Bedrooms"
                    name="bedrooms"
                    value={property.bedrooms}
                    onChange={handleNumberChange}
                    disabled={!isEditMode}
                    type="text"
                    inputProps={{ inputMode: 'numeric' }}
                />
            </Grid>

            {/* Bathrooms */}
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    fullWidth
                    label="Bathrooms"
                    name="bathrooms"
                    value={property.bathrooms}
                    onChange={handleNumberChange}
                    disabled={!isEditMode}
                    type="text"
                    inputProps={{ inputMode: 'numeric' }}
                />
            </Grid>

            {/* Size */}
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    fullWidth
                    label="Size (sq.ft)"
                    name="size"
                    value={property.size}
                    onChange={handleNumberChange}
                    disabled={!isEditMode}
                    type="text"
                    inputProps={{ inputMode: 'numeric' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">sq.ft</InputAdornment>
                    }}
                />
            </Grid>

            {/* Year Built */}
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    fullWidth
                    label="Year Built"
                    name="built_year"
                    value={property.built_year}
                    onChange={handleNumberChange}
                    disabled={!isEditMode}
                    type="text"
                    inputProps={{ inputMode: 'numeric' }}
                />
            </Grid>

            {/* Country */}
            <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth required>
                    <InputLabel>Country</InputLabel>
                    <Select
                        name="country_id"
                        value={property.country_id}
                        onChange={handleInputChange}
                        label="Country"
                        disabled={!isEditMode}
                    >
                        {countries.map(country => (
                            <MenuItem key={country.id} value={country.id}>{country?.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Division */}
            <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth required disabled={!property.country_id || !isEditMode}>
                    <InputLabel>Division</InputLabel>
                    <Select
                        name="division_id"
                        value={property.division_id}
                        onChange={handleInputChange}
                        label="Division"
                        disabled={!property.country_id || !isEditMode}
                    >
                        {divisions.map(division => (
                            <MenuItem key={division.id} value={division.id}>{division?.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* District */}
            <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth required disabled={!property.division_id || !isEditMode}>
                    <InputLabel>District</InputLabel>
                    <Select
                        name="district_id"
                        value={property.district_id}
                        onChange={handleInputChange}
                        label="District"
                        disabled={!property.division_id || !isEditMode}
                    >
                        {districts.map(district => (
                            <MenuItem key={district.id} value={district.id}>{district?.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Location (Area/Neighborhood) */}
            {/* <Grid item xs={12} sm={6} md={6}>
                <TextField
                    fullWidth
                    label="Location/Area"
                    name="location"
                    value={property.location}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    placeholder="e.g., Downtown, West End, etc."
                    required
                />
            </Grid> */}

            {/* Address */}
            <Grid item xs={12} sm={6} md={6}>
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={property.address}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    placeholder="Full address"
                    required
                />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={property.description}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                    multiline
                    rows={6}
                />
            </Grid>
        </Grid>
    );
};

export default PropertyBasicInfoForm;