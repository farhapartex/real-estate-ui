import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Chip,
    Divider,
    Grid,
    FormControlLabel,
    Switch
} from '@mui/material';

const PropertyFeaturesForm = ({
    property,
    featureInput,
    setFeatureInput,
    handleAddFeature,
    handleRemoveFeature,
    handleAmenityChange,
    handleParkingChange,
    isEditMode
}) => {
    return (
        <>
            {/* Features */}
            <Typography variant="h6" gutterBottom>
                Features
            </Typography>
            <Box sx={{ mb: 3 }}>
                {isEditMode && (
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Add Feature"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            placeholder="e.g., Swimming Pool, Garden, etc."
                            sx={{ mr: 1 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddFeature}
                            disabled={!featureInput}
                        >
                            Add
                        </Button>
                    </Box>
                )}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {property.features.length > 0 ? (
                        property.features.map((feature, index) => (
                            <Chip
                                key={index}
                                label={feature}
                                onDelete={isEditMode ? () => handleRemoveFeature(feature) : undefined}
                                color="primary"
                                variant="outlined"
                            />
                        ))
                    ) : (
                        <Typography color="text.secondary">No features added yet.</Typography>
                    )}
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Amenities */}
            <Typography variant="h6" gutterBottom>
                Amenities
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.airConditioning}
                                onChange={handleAmenityChange}
                                name="airConditioning"
                                disabled={!isEditMode}
                            />
                        }
                        label="Air Conditioning"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.heating}
                                onChange={handleAmenityChange}
                                name="heating"
                                disabled={!isEditMode}
                            />
                        }
                        label="Heating"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.furnished}
                                onChange={handleAmenityChange}
                                name="furnished"
                                disabled={!isEditMode}
                            />
                        }
                        label="Furnished"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.petsAllowed}
                                onChange={handleAmenityChange}
                                name="petsAllowed"
                                disabled={!isEditMode}
                            />
                        }
                        label="Pets Allowed"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.washerDryer}
                                onChange={handleAmenityChange}
                                name="washerDryer"
                                disabled={!isEditMode}
                            />
                        }
                        label="Washer/Dryer"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.elevator}
                                onChange={handleAmenityChange}
                                name="elevator"
                                disabled={!isEditMode}
                            />
                        }
                        label="Elevator"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.securitySystem}
                                onChange={handleAmenityChange}
                                name="securitySystem"
                                disabled={!isEditMode}
                            />
                        }
                        label="Security System"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.fireplace}
                                onChange={handleAmenityChange}
                                name="fireplace"
                                disabled={!isEditMode}
                            />
                        }
                        label="Fireplace"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.pool}
                                onChange={handleAmenityChange}
                                name="pool"
                                disabled={!isEditMode}
                            />
                        }
                        label="Swimming Pool"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.gym}
                                onChange={handleAmenityChange}
                                name="gym"
                                disabled={!isEditMode}
                            />
                        }
                        label="Gym"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={property.amenities.outdoorSpace}
                                onChange={handleAmenityChange}
                                name="outdoorSpace"
                                disabled={!isEditMode}
                            />
                        }
                        label="Outdoor Space"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Parking Spots"
                        value={property.amenities.parking}
                        onChange={handleParkingChange}
                        type="text"
                        inputProps={{ inputMode: 'numeric' }}
                        disabled={!isEditMode}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default PropertyFeaturesForm;