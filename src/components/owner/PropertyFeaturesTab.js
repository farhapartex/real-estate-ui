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
    Switch,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PropertyFeaturesForm = ({
    property,
    featureInput,
    setFeatureInput,
    handleAddFeature,
    handleRemoveFeature,
    handleAmenityChange,
    handleParkingChange,
    handleGarageChange,
    handleCeilingHeightChange,
    handleLotSizeChange,
    handleNumberChange,
    isEditMode
}) => {
    return (
        <Box>
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

            {/* Basic Amenities */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Basic Amenities</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.amenities.airConditioning || false}
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
                                        checked={property.amenities.heating || false}
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
                                        checked={property.amenities.furnished || false}
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
                                        checked={property.amenities.petsAllowed || false}
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
                                        checked={property.amenities.washerDryer || false}
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
                                        checked={property.amenities.inUnitLaundry || false}
                                        onChange={handleAmenityChange}
                                        name="inUnitLaundry"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="In-Unit Laundry"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.amenities.elevator || false}
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
                                        checked={property.amenities.outdoorSpace || false}
                                        onChange={handleAmenityChange}
                                        name="outdoorSpace"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Outdoor Space"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.amenities.balconyPatio || false}
                                        onChange={handleAmenityChange}
                                        name="balconyPatio"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Balcony/Patio"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.amenities.disabilityAccess || false}
                                        onChange={handleAmenityChange}
                                        name="disabilityAccess"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Disability Access"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.amenities.hardwoodFloors || false}
                                        onChange={handleAmenityChange}
                                        name="hardwoodFloors"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Hardwood Floors"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Parking Spots"
                                value={property.amenities.parking || 0}
                                onChange={handleParkingChange}
                                type="number"
                                inputProps={{ inputMode: 'numeric' }}
                                disabled={!isEditMode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Number of Garages"
                                name="garages"
                                value={property.amenities.garages || 0}
                                onChange={handleGarageChange}
                                type="number"
                                inputProps={{ inputMode: 'numeric' }}
                                disabled={!isEditMode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Ceiling Height (ft)"
                                name="ceilingHeight"
                                value={property.amenities.ceilingHeight || 0}
                                onChange={handleCeilingHeightChange}
                                type="number"
                                inputProps={{ inputMode: 'numeric' }}
                                disabled={!isEditMode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                fullWidth
                                label="Lot Size (sq.ft)"
                                name="lotSize"
                                value={property.amenities.lotSize || 0}
                                onChange={handleLotSizeChange}
                                type="number"
                                inputProps={{ inputMode: 'numeric' }}
                                disabled={!isEditMode}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Security Features */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Security Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.securityFeature.securitySystem || false}
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
                                        checked={property.securityFeature.doorman || false}
                                        onChange={handleAmenityChange}
                                        name="doorman"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Doorman"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.securityFeature.securityCamera || false}
                                        onChange={handleAmenityChange}
                                        name="securityCamera"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Security Cameras"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.securityFeature.gatedCommunity || false}
                                        onChange={handleAmenityChange}
                                        name="gatedCommunity"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Gated Community"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.securityFeature.fireAlarm || false}
                                        onChange={handleAmenityChange}
                                        name="gatedCommunity"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Fire Alarm"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Appliances and Technology */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Appliances & Technology</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.internetWifi || false}
                                        onChange={handleAmenityChange}
                                        name="internetWifi"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Internet/WiFi"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.smartHome || false}
                                        onChange={handleAmenityChange}
                                        name="smartHome"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Smart Home Features"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.dishwasher || false}
                                        onChange={handleAmenityChange}
                                        name="dishwasher"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Dishwasher"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.garbageDisposal || false}
                                        onChange={handleAmenityChange}
                                        name="garbageDisposal"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Garbage Disposal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.refrigerator || false}
                                        onChange={handleAmenityChange}
                                        name="refrigerator"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Refrigerator"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.microwave || false}
                                        onChange={handleAmenityChange}
                                        name="microwave"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Microwave"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.stoveOven || false}
                                        onChange={handleAmenityChange}
                                        name="stoveOven"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Stove/Oven"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.cableTV || false}
                                        onChange={handleAmenityChange}
                                        name="cableReady"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Cable/Satellite Ready"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.technologyFeature.ceilingFans || false}
                                        onChange={handleAmenityChange}
                                        name="ceilingFans"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Ceiling Fans"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Luxury Features */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Luxury & Comfort Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.luxaryFeature.fireplace || false}
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
                                        checked={property.luxaryFeature.pool || false}
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
                                        checked={property.luxaryFeature.gym || false}
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
                                        checked={property.luxaryFeature.walkInClosets || false}
                                        onChange={handleAmenityChange}
                                        name="walkInClosets"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Walk-in Closets"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.luxaryFeature.jacuzzi || false}
                                        onChange={handleAmenityChange}
                                        name="jacuzzi"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Jacuzzi/Hot Tub"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.luxaryFeature.sauna || false}
                                        onChange={handleAmenityChange}
                                        name="sauna"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Sauna"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Community Features */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Community Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.concierge || false}
                                        onChange={handleAmenityChange}
                                        name="concierge"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="24-hour Concierge"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.businessCenter || false}
                                        onChange={handleAmenityChange}
                                        name="businessCenter"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Business Center"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.conferenceRoom || false}
                                        onChange={handleAmenityChange}
                                        name="conferenceRoom"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Conference Room"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.guestParking || false}
                                        onChange={handleAmenityChange}
                                        name="guestParking"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Guest Parking"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.playground || false}
                                        onChange={handleAmenityChange}
                                        name="playground"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Playground"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.bbqArea || false}
                                        onChange={handleAmenityChange}
                                        name="bbqArea"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="BBQ Area"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.communityGarden || false}
                                        onChange={handleAmenityChange}
                                        name="communityGarden"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Community Garden"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.tennisCourt || false}
                                        onChange={handleAmenityChange}
                                        name="tennisCourt"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Tennis Court"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.communityFeature.basketballCourt || false}
                                        onChange={handleAmenityChange}
                                        name="basketballCourt"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Basketball Court"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Utilities */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Utilities Included</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.utilsFeature.waterIncluded || false}
                                        onChange={handleAmenityChange}
                                        name="waterIncluded"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Water Included"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.utilsFeature.gasIncluded || false}
                                        onChange={handleAmenityChange}
                                        name="gasIncluded"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Gas Included"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.utilsFeature.electricityIncluded || false}
                                        onChange={handleAmenityChange}
                                        name="electricityIncluded"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Electricity Included"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.utilsFeature.trashIncluded || false}
                                        onChange={handleAmenityChange}
                                        name="trashIncluded"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Trash Removal Included"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.utilsFeature.internetIncluded || false}
                                        onChange={handleAmenityChange}
                                        name="internetIncluded"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Cable/Internet Included"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Energy Features */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Energy Features</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.energyFeature.solarPanels || false}
                                        onChange={handleAmenityChange}
                                        name="solarPanels"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Solar Panels"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.energyFeature.energyEfficientAppliances || false}
                                        onChange={handleAmenityChange}
                                        name="energyEfficientAppliances"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Energy-Efficient Appliances"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.energyFeature.greenCertification || false}
                                        onChange={handleAmenityChange}
                                        name="greenCertification"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Green Building Certification"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.energyFeature.evCharging || false}
                                        onChange={handleAmenityChange}
                                        name="evCharging"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="EV Charging Stations"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.energyFeature.rainwaterHarvesting || false}
                                        onChange={handleAmenityChange}
                                        name="rainwaterHarvesting"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Rainwater Harvesting"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={property.energyFeature.programmableThermostat || false}
                                        onChange={handleAmenityChange}
                                        name="programmableThermostat"
                                        disabled={!isEditMode}
                                    />
                                }
                                label="Programmable Thermostat"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default PropertyFeaturesForm;