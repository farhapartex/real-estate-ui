import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

const PropertyCard = ({ property, onCardClick, hideFeaturedBadge = false }) => {
    const {
        images,
        name,
        location,
        country,
        bedrooms,
        bathrooms,
        size
    } = property;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                }
            }}
            onClick={() => onCardClick(property)}
        >
            {/* Property Image */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={images[0]}
                    alt={name}
                />
                {/* Call for details flag */}
                <Chip
                    label="Call for details"
                    color="secondary"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                    }}
                />
                {/* Featured badge */}
                {
                    !hideFeaturedBadge && (
                        <Chip
                            label="Featured"
                            color="primary"
                            sx={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                bgcolor: 'primary.main',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        />
                    )
                }

            </Box>

            {/* Property Details */}
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                {/* Property Name */}
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {name}
                </Typography>

                {/* Location with icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon color="action" sx={{ mr: 0.5, fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                        {location}, {country}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* Property features */}
                <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BedIcon color="action" sx={{ mr: 0.5, fontSize: 18 }} />
                        <Typography variant="body2">{bedrooms} Beds</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BathtubIcon color="action" sx={{ mr: 0.5, fontSize: 18 }} />
                        <Typography variant="body2">{bathrooms} Baths</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SquareFootIcon color="action" sx={{ mr: 0.5, fontSize: 18 }} />
                        <Typography variant="body2">{size} sq.ft</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;