// File: components/property/details/PropertyImagesTab.jsx
import React, { useState } from 'react';
import {
    Grid,
    Box,
    Typography,
    Paper,
    IconButton,
    Stack,
    Divider,
    Alert
} from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Image as ImageIcon
} from '@mui/icons-material';

const PropertyImagesTab = ({ images = [], title }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const handlePrevImage = () => {
        setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index) => {
        setCurrentImage(index);
    };

    // If no images are available
    if (!images || images.length === 0) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={4}
            >
                <ImageIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Images Available
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                    This property doesn't have any images uploaded yet.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Paper
                elevation={0}
                variant="outlined"
                sx={{
                    mb: 2,
                    position: 'relative',
                    height: 450,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                <Box
                    component="img"
                    src={images[currentImage] || "/placeholder.jpg"}
                    alt={`${title} - Image ${currentImage + 1}`}
                    sx={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                    }}
                />

                {/* Navigation arrows */}
                <IconButton
                    sx={{
                        position: 'absolute',
                        left: 16,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.7)',
                        }
                    }}
                    onClick={handlePrevImage}
                >
                    <ChevronLeftIcon />
                </IconButton>

                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 16,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.7)',
                        }
                    }}
                    onClick={handleNextImage}
                >
                    <ChevronRightIcon />
                </IconButton>

                {/* Image counter */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 4
                    }}
                >
                    <Typography variant="body2">
                        {currentImage + 1} / {images.length}
                    </Typography>
                </Box>
            </Paper>

            <Divider sx={{ my: 2 }} />

            {/* Thumbnails */}
            <Typography variant="subtitle1" gutterBottom>
                All Images ({images.length})
            </Typography>

            <Grid container spacing={1}>
                {images.map((image, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 0.5,
                                cursor: 'pointer',
                                borderColor: currentImage === index ? 'primary.main' : 'divider',
                                borderWidth: currentImage === index ? 2 : 1,
                                height: 100,
                                overflow: 'hidden'
                            }}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            <Box
                                component="img"
                                src={image}
                                alt={`${title} - Thumbnail ${index + 1}`}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PropertyImagesTab;