import React, { useState } from 'react';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Link,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PropertyDetailsModal = ({ open, onClose, property }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Guard clause for when property data isn't loaded yet
    if (!property) return null;

    const {
        images = ['https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb', 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92', 'https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490', 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353', 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b'],
        title,
        price,
        listingType = 'For Rent', // 'For Rent' or 'For Sale'
        bedrooms,
        bathrooms,
        size,
        location,
        country,
        description,
        id
    } = property;

    // Truncate description if it's too long
    const truncatedDescription = description?.substring(0, Math.floor(description.length * 0.2));
    const displayedDescription = showFullDescription ? description : truncatedDescription;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullScreen={fullScreen}
            scroll="paper"
            aria-labelledby="property-details-modal"
        >
            <Box display="flex" justifyContent="flex-end" p={1}>
                <IconButton onClick={onClose} size="large">
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent>
                {/* Image Gallery - Modern Grid Layout */}
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={1} sx={{ position: 'relative' }}>
                        {/* Main large image */}
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={images[0] || 'https://source.unsplash.com/random/800x600/?apartment'}
                                alt={title}
                                sx={{
                                    width: '100%',
                                    height: { xs: 250, md: 400 },
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                }}
                            />
                        </Grid>

                        {/* Secondary images in a grid */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={1}>
                                {images.slice(1, 5).map((image, index) => (
                                    <Grid item xs={6} key={index}>
                                        <Box
                                            component="img"
                                            src={image || `https://source.unsplash.com/random/400x300/?apartment,interior,${index}`}
                                            alt={`${title} - image ${index + 2}`}
                                            sx={{
                                                width: '100%',
                                                height: { xs: 120, md: 198 },
                                                objectFit: 'cover',
                                                borderRadius: 1,
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        {/* More Images Button */}
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                },
                            }}
                        >
                            More Images...
                        </Button>
                    </Grid>
                </Box>

                {/* Property Title and Tag */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                    <Typography variant="h5" component="h2" sx={{ mr: 2, fontWeight: 'bold' }}>
                        {title || 'Luxury Apartment'}
                    </Typography>
                    <Chip
                        label={listingType}
                        color={listingType === 'For Sale' ? 'primary' : 'secondary'}
                        size="small"
                        sx={{ height: 24 }}
                    />
                </Box>

                {/* Price */}
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {typeof price === 'number' ? `$${price.toLocaleString()}` : price || '$2,500/month'}
                </Typography>

                {/* Property Metadata */}
                <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: 1 }}>
                        <BedIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body1">
                            <Box component="span" sx={{ fontWeight: 'bold' }}>{bedrooms || 3}</Box> bed
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: 1 }}>
                        <BathtubIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body1">
                            <Box component="span" sx={{ fontWeight: 'bold' }}>{bathrooms || 2}</Box> bath
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SquareFootIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body1">
                            <Box component="span" sx={{ fontWeight: 'bold' }}>{size?.toLocaleString() || '1,200'}</Box> sqft
                        </Typography>
                    </Box>
                </Box>

                {/* Address with Map Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <LocationOnIcon color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                        {location || 'Downtown'}, {country || 'Bangladesh'}
                    </Typography>
                </Box>

                {/* Description with See More */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                        Description
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {displayedDescription || 'This property features modern amenities in a convenient location...'}
                        {!showFullDescription && description && description.length > truncatedDescription.length && (
                            <Button
                                onClick={() => setShowFullDescription(true)}
                                sx={{ ml: 1, p: 0, minWidth: 'auto', textTransform: 'none' }}
                            >
                                See more
                            </Button>
                        )}
                    </Typography>
                </Box>

                {/* Details Link */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link
                        href={`/property/${id}`}
                        underline="hover"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'medium',
                            color: 'primary.main'
                        }}
                    >
                        Details
                        <ArrowForwardIcon sx={{ ml: 0.5, fontSize: 18 }} />
                    </Link>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PropertyDetailsModal;