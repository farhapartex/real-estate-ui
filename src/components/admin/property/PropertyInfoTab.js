// File: components/property/details/PropertyInfoTab.jsx
import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    AttachMoney as PriceIcon,
    Straighten as AreaIcon,
    SingleBed as BedroomIcon,
    Bathtub as BathroomIcon,
    Garage as GarageIcon,
    CalendarToday as CalendarIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Category as CategoryIcon,
    Home as HomeIcon,
    Apartment as ApartmentIcon,
    Business as BusinessIcon,
    Landscape as LandscapeIcon,
    Domain as CondoIcon,
    House as HouseIcon,
    WaterDrop as WaterIcon,
    Power as ElectricityIcon,
    Thermostat as HeatingIcon,
    AcUnit as CoolingIcon,
    Wifi as InternetIcon,
    CheckBox as CheckBoxIcon,
    Pets as PetsIcon,
    KingBed as FurnishedIcon
} from '@mui/icons-material';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FlagIcon from '@mui/icons-material/Flag';

// Import utilities
import {
    formatCurrency,
    formatDate,
    formatArea,
    getListingTypeLabel
} from '../../utils/propertyUtils';

const PropertyInfoTab = ({ property }) => {
    const getPropertyTypeIcon = () => {
        switch (property.type) {
            case 'apartment':
                return <ApartmentIcon fontSize="small" />;
            case 'house':
                return <HouseIcon fontSize="small" />;
            case 'condo':
                return <CondoIcon fontSize="small" />;
            case 'townhouse':
                return <HomeIcon fontSize="small" />;
            case 'land':
                return <LandscapeIcon fontSize="small" />;
            case 'commercial':
                return <BusinessIcon fontSize="small" />;
            default:
                return <HomeIcon fontSize="small" />;
        }
    };

    // Format amenities to check which ones are available
    const amenities = {
        water: property.amenities?.water ?? false,
        electricity: property.amenities?.electricity ?? false,
        heating: property.amenities?.heating ?? false,
        cooling: property.amenities?.cooling ?? false,
        internet: property.amenities?.internet ?? false,
        furnished: property.amenities?.furnished ?? false,
        petFriendly: property.amenities?.petFriendly ?? false
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <Box mb={3}>
                    <Typography variant="h6" gutterBottom>Overview</Typography>
                    <Typography variant="body1">
                        {property.description}
                    </Typography>
                </Box>

                <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Property Details</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
                                <HomeIcon color="primary" sx={{ fontSize: 30, mb: 1 }} />
                                <Typography variant="body2" color="textSecondary">Property Type</Typography>
                                <Typography variant="body1" align="center">
                                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
                                <AreaIcon color="primary" sx={{ fontSize: 30, mb: 1 }} />
                                <Typography variant="body2" color="textSecondary">Area</Typography>
                                <Typography variant="body1">{formatArea(property.area)}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
                                <BedroomIcon color="primary" sx={{ fontSize: 30, mb: 1 }} />
                                <Typography variant="body2" color="textSecondary">Bedrooms</Typography>
                                <Typography variant="body1">{property.bedrooms}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box display="flex" flexDirection="column" alignItems="center" p={1}>
                                <BathroomIcon color="primary" sx={{ fontSize: 30, mb: 1 }} />
                                <Typography variant="body2" color="textSecondary">Bathrooms</Typography>
                                <Typography variant="body1">{property.bathrooms}</Typography>
                            </Box>
                        </Grid>

                        {property.garages > 0 && (
                            <Grid item xs={12} sm={6} md={3}>
                                <Box display="flex" flexDirection="column" alignItems="center" p={1}>
                                    <GarageIcon color="primary" sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="body2" color="textSecondary">Garages</Typography>
                                    <Typography variant="body1">{property.garages}</Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Paper>

                <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Amenities</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <WaterIcon color={amenities.water ? "primary" : "disabled"} />
                                <Typography
                                    variant="body1"
                                    color={amenities.water ? "textPrimary" : "textSecondary"}
                                >
                                    Water {amenities.water ? "Included" : "Not Included"}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <ElectricityIcon color={amenities.electricity ? "primary" : "disabled"} />
                                <Typography
                                    variant="body1"
                                    color={amenities.electricity ? "textPrimary" : "textSecondary"}
                                >
                                    Electricity {amenities.electricity ? "Included" : "Not Included"}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <HeatingIcon color={amenities.heating ? "primary" : "disabled"} />
                                <Typography
                                    variant="body1"
                                    color={amenities.heating ? "textPrimary" : "textSecondary"}
                                >
                                    Heating {amenities.heating ? "Available" : "Not Available"}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <CoolingIcon color={amenities.cooling ? "primary" : "disabled"} />
                                <Typography
                                    variant="body1"
                                    color={amenities.cooling ? "textPrimary" : "textSecondary"}
                                >
                                    Cooling/AC {amenities.cooling ? "Available" : "Not Available"}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <InternetIcon color={amenities.internet ? "primary" : "disabled"} />
                                <Typography
                                    variant="body1"
                                    color={amenities.internet ? "textPrimary" : "textSecondary"}
                                >
                                    Internet {amenities.internet ? "Included" : "Not Included"}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FurnishedIcon color={amenities.furnished ? "primary" : "disabled"} />
                                <Typography
                                    variant="body1"
                                    color={amenities.furnished ? "textPrimary" : "textSecondary"}
                                >
                                    {amenities.furnished ? "Furnished" : "Not Furnished"}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <PetsIcon color={amenities.petFriendly ? "primary" : "disabled"} />
                                <Typography
                                    variant="body1"
                                    color={amenities.petFriendly ? "textPrimary" : "textSecondary"}
                                >
                                    {amenities.petFriendly ? "Pet Friendly" : "No Pets Allowed"}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {property.additionalFeatures && property.additionalFeatures.length > 0 && (
                    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>Additional Features</Typography>
                        <Grid container spacing={1}>
                            {property.additionalFeatures.map((feature, index) => (
                                <Grid item key={index}>
                                    <Chip
                                        icon={<CheckBoxIcon />}
                                        label={feature}
                                        variant="outlined"
                                        color="primary"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                )}
            </Grid>

            <Grid item xs={12} md={4}>
                <Card elevation={3} sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Listing Information</Typography>

                        <List disablePadding>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    <PriceIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Price"
                                    secondary={formatCurrency(property.price)}
                                    secondaryTypographyProps={{ variant: 'h6', color: 'primary' }}
                                />
                            </ListItem>

                            <Divider component="li" />

                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    <CategoryIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Listing Type"
                                    secondary={getListingTypeLabel(property.listingType)}
                                />
                            </ListItem>

                            <Divider component="li" />

                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    <CalendarIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Listed On"
                                    secondary={formatDate(property.listedOn)}
                                />
                            </ListItem>

                            <Divider component="li" />

                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    {property.featured ? (
                                        <StarIcon color="warning" />
                                    ) : (
                                        <StarBorderIcon color="disabled" />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary="Featured Status"
                                    secondary={property.featured ? "Featured Property" : "Not Featured"}
                                />
                            </ListItem>

                            <Divider component="li" />

                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    {property.status === 'active' ? (
                                        <CheckCircleIcon color="success" />
                                    ) : property.status === 'pending' ? (
                                        <CheckCircleIcon color="warning" />
                                    ) : (
                                        <CancelIcon color="error" />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary="Listing Status"
                                    secondary={property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                                />
                            </ListItem>

                            {property.flagged && (
                                <>
                                    <Divider component="li" />

                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemIcon>
                                            <FlagIcon color="error" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Flagged"
                                            secondary="This property has been flagged as potentially inappropriate"
                                        />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </CardContent>
                </Card>

                <Card elevation={3}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Location</Typography>
                        <Box
                            component="img"
                            src="/map-placeholder.jpg"
                            alt="Map Location"
                            sx={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                                borderRadius: 1
                            }}
                        />
                        <Typography variant="body1" mt={2}>
                            <LocationIcon color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                            {property.address}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default PropertyInfoTab;