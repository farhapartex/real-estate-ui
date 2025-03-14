// File: utils/blogUtils.js
import React from 'react';
import { Chip } from '@mui/material';
import {
    Public as PublicIcon,
    PublicOff as PublicOffIcon,
    EditNote as DraftIcon
} from '@mui/icons-material';

/**
 * Formats a date string to a readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';

    // Strip HTML tags for plain text truncation
    const plainText = text.replace(/<[^>]+>/g, '');

    if (plainText.length <= maxLength) {
        return plainText;
    }

    return plainText.substring(0, maxLength) + '...';
};

/**
 * Returns a styled chip component for blog status
 * @param {string} status - The blog status ('published', 'draft')
 * @returns {React.ReactElement} - MUI Chip component for the status
 */
export const getBlogStatusChip = (status) => {
    switch (status) {
        case 'published':
            return (
                <Chip
                    icon={<PublicIcon />}
                    label="Published"
                    color="success"
                    size="small"
                    variant="outlined"
                />
            );
        case 'draft':
            return (
                <Chip
                    icon={<DraftIcon />}
                    label="Draft"
                    color="warning"
                    size="small"
                    variant="outlined"
                />
            );
        default:
            return (
                <Chip
                    label={status}
                    size="small"
                    variant="outlined"
                />
            );
    }
};

/**
 * Validates a blog form
 * @param {Object} formData - The blog form data
 * @returns {Object} - Object containing validation errors, if any
 */
export const validateBlogForm = (formData) => {
    const errors = {};

    if (!formData.title.trim()) {
        errors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
        errors.content = 'Content is required';
    }

    if (!formData.author.trim()) {
        errors.author = 'Author name is required';
    }

    if (!formData.category) {
        errors.category = 'Category is required';
    }

    return errors;
};