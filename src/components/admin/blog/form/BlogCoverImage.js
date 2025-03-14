// File: components/blog/form/BlogCoverImage.jsx
import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
    IconButton,
    FormHelperText
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

/**
 * Component for blog cover image upload and preview
 * 
 * @param {Object} props - Component props
 * @param {Object} props.fileInputRef - React ref for file input
 * @param {string} props.previewUrl - Image preview URL
 * @param {Function} props.onImageClick - Handler for image upload click
 * @param {Function} props.onImageChange - Handler for image change
 * @param {Function} props.onRemoveImage - Handler for image removal
 * @param {Object} props.error - Image validation error
 */
const BlogCoverImage = ({
    fileInputRef,
    previewUrl,
    onImageClick,
    onImageChange,
    onRemoveImage,
    error
}) => {
    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Cover Image
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={onImageChange}
            />

            {previewUrl ? (
                <Box sx={{ position: 'relative' }}>
                    <Box
                        component="img"
                        src={previewUrl}
                        alt="Cover preview"
                        sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: 1,
                            mb: 1
                        }}
                    />
                    <IconButton
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.7)',
                            }
                        }}
                        onClick={onRemoveImage}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ) : (
                <Box
                    sx={{
                        border: '2px dashed #ccc',
                        borderRadius: 1,
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                            borderColor: 'primary.main',
                        }
                    }}
                    onClick={onImageClick}
                >
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body1" gutterBottom>
                        Click to upload cover image
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Recommended size: 1200x630 pixels (16:9 ratio)
                    </Typography>
                </Box>
            )}

            {error && (
                <FormHelperText error>{error}</FormHelperText>
            )}
        </Paper>
    );
};

export default BlogCoverImage;