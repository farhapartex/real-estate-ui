// File: utils/userUtils.js
import React from 'react';
import {
    Chip
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

/**
 * Returns the appropriate icon for the given user type
 * @param {string} type - The user type ('admin', 'landlord', or 'renter')
 * @returns {React.ReactElement} - Icon component for the user type
 */
export const getUserTypeIcon = (type) => {
    switch (type) {
        case 'admin':
            return <AdminPanelSettingsIcon />;
        case 'landlord':
            return <BusinessIcon />;
        case 'renter':
            return <PersonIcon />;
        default:
            return <PersonIcon />;
    }
};

/**
 * Returns a styled chip component for the given user status
 * @param {string} status - The user status ('active', 'inactive', or 'pending')
 * @returns {React.ReactElement} - Chip component with appropriate styling
 */
export const getUserStatusChip = (status) => {
    switch (status) {
        case 'active':
            return <Chip size="small" label="Active" color="success" />;
        case 'inactive':
            return <Chip size="small" label="Inactive" color="default" />;
        case 'pending':
            return <Chip size="small" label="Pending" color="warning" />;
        default:
            return <Chip size="small" label={status} />;
    }
};

/**
 * Formats a date string to a readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Returns the appropriate color for a user type
 * @param {string} type - The user type ('admin', 'landlord', or 'renter')
 * @returns {string} - Material UI color name
 */
export const getUserTypeColor = (type) => {
    switch (type) {
        case 'admin':
            return 'primary';
        case 'landlord':
            return 'warning';
        case 'renter':
            return 'success';
        default:
            return 'default';
    }
};

/**
 * Gets the status text for a verification document
 * @param {string} status - The document status ('verified', 'pending', or 'rejected')
 * @returns {object} - Object with text and color properties
 */
export const getDocumentStatusInfo = (status) => {
    switch (status) {
        case 'verified':
            return { text: 'Verified', color: 'success' };
        case 'pending':
            return { text: 'Pending Review', color: 'warning' };
        case 'rejected':
            return { text: 'Rejected', color: 'error' };
        default:
            return { text: status, color: 'default' };
    }
};