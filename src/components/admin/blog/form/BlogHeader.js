// File: components/blog/form/BlogHeader.jsx
import React from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    Clear as ClearIcon
} from '@mui/icons-material';

/**
 * Header component for blog create/edit forms
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {Function} props.onBack - Handler for back button
 * @param {Function} props.onSaveDraft - Handler for saving as draft
 * @param {Function} props.onPublish - Handler for publishing
 * @param {boolean} props.isEdit - Whether in edit mode
 */
const BlogHeader = ({ title, onBack, onSaveDraft, onPublish, isEdit = false }) => {
    return (
        <Box display="flex" alignItems="center" mb={3}>
            <IconButton onClick={onBack} sx={{ mr: 1 }}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1" flex="1">
                {title}
            </Typography>
            <Box display="flex" gap={1}>
                <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={onBack}
                >
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={onSaveDraft}
                >
                    Save as Draft
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={onPublish}
                >
                    {isEdit ? 'Update & Publish' : 'Publish'}
                </Button>
            </Box>
        </Box>
    );
};

export default BlogHeader;