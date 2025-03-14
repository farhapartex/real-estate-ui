import React from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    IconButton
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

const PropertyPhotosForm = ({
    property,
    handleImageUpload,
    handleRemoveImage,
    isEditMode
}) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Property Photos
            </Typography>

            {isEditMode && (
                <Box sx={{ mb: 3 }}>
                    <input
                        type="file"
                        id="property-images"
                        multiple
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="property-images">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Photos
                        </Button>
                    </label>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        Recommended size: 800x600 pixels. Maximum 10 images.
                    </Typography>
                </Box>
            )}

            {/* Image Gallery */}
            <Grid container spacing={2}>
                {property.images.length > 0 ? (
                    property.images.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={image}
                                    alt={`Property image ${index + 1}`}
                                />
                                {isEditMode && (
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 0, 0, 0.7)',
                                            }
                                        }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography color="text.secondary" sx={{ p: 2 }}>
                            No images uploaded yet. {isEditMode && 'Upload images to showcase your property.'}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default PropertyPhotosForm;