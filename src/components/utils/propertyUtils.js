// File: utils/propertyUtils.js
import React from 'react';
import {
    Chip
} from '@mui/material';

import ApartmentIcon from '@mui/icons-material/Apartment';
import HouseIcon from '@mui/icons-material/House';
import DomainIcon from '@mui/icons-material/Domain';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import LandscapeIcon from '@mui/icons-material/Landscape';
import BusinessIcon from '@mui/icons-material/Business';

/**
 * Returns the appropriate icon for the given property type
 * @param {string} type - The property type (apartment, house, condo, etc.)
 * @returns {React.ReactElement} - Icon component for the property type
 */
export const getPropertyTypeIcon = (type) => {
    switch (type) {
        case 'apartment':
            return <ApartmentIcon />;
        case 'house':
            return <HouseIcon />;
        case 'condo':
            return <DomainIcon />;
        case 'townhouse':
            return <OtherHousesIcon />;
        case 'land':
            return <LandscapeIcon />;
        case 'commercial':
            return <BusinessIcon />;
        default:
            return <OtherHousesIcon />;
    }
};

/**
 * Returns a styled chip component for the given property status
 * @param {string} status - The property status (active, pending, inactive, rejected)
 * @returns {React.ReactElement} - Chip component with appropriate styling
 */
export const getStatusChip = (status) => {
    switch (status) {
        case 'active':
            return <Chip size="small" label="Active" color="success" />;
        case 'pending':
            return <Chip size="small" label="Pending" color="warning" />;
        case 'inactive':
            return <Chip size="small" label="Inactive" color="default" />;
        case 'rejected':
            return <Chip size="small" label="Rejected" color="error" />;
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
 * Formats a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
    }).format(amount);
};

/**
 * Returns the property listing type (Rent/Sale)
 * @param {string} listingType - The listing type
 * @returns {string} - Formatted listing type
 */
export const getListingTypeLabel = (listingType) => {
    switch (listingType) {
        case 'rent':
            return 'For Rent';
        case 'sale':
            return 'For Sale';
        default:
            return listingType.charAt(0).toUpperCase() + listingType.slice(1);
    }
};

/**
 * Returns a formatted area string
 * @param {number} area - The area value
 * @param {string} unit - The unit of measurement (default: sq ft)
 * @returns {string} - Formatted area string
 */
export const formatArea = (area, unit = 'sq ft') => {
    return `${area.toLocaleString()} ${unit}`;
};

/**
 * Returns a formatted address
 * @param {object} property - The property object
 * @returns {string} - Formatted address string
 */
export const getFormattedAddress = (property) => {
    if (property.address) return property.address;

    const parts = [];
    if (property.streetAddress) parts.push(property.streetAddress);
    if (property.city) parts.push(property.city);
    if (property.state) parts.push(property.state);
    if (property.zipCode) parts.push(property.zipCode);

    return parts.join(', ');
};