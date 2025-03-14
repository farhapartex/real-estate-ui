// File: components/location/AddLocationDialog.jsx
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    FormHelperText,
    IconButton
} from '@mui/material';
import {
    Close as CloseIcon,
    Flag as FlagIcon,
    LocationCity as DivisionIcon,
    LocationOn as DistrictIcon
} from '@mui/icons-material';

const AddLocationDialog = ({
    open,
    onClose,
    onSubmit,
    locationType,
    countries,
    divisions
}) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [parentId, setParentId] = useState('');
    const [errors, setErrors] = useState({});
    const [filteredDivisions, setFilteredDivisions] = useState([]);

    // Reset form on open and locationType changes
    useEffect(() => {
        if (open) {
            setName('');
            setCode('');
            setParentId('');
            setErrors({});
        }
    }, [open, locationType]);

    // Reset parent when locationType changes
    useEffect(() => {
        setParentId('');
    }, [locationType]);

    // Filter divisions when country is selected (for districts)
    useEffect(() => {
        if (locationType === 'district' && parentId) {
            const selectedCountry = countries.find(c => c.id === parseInt(parentId));
            if (selectedCountry) {
                setFilteredDivisions(divisions.filter(d => d.countryId === selectedCountry.id));
            }
        }
    }, [locationType, parentId, countries, divisions]);

    const handleSubmit = () => {
        const newErrors = {};

        if (!name) {
            newErrors.name = 'Name is required';
        }

        if (locationType === 'country' && !code) {
            newErrors.code = 'Country code is required';
        }

        if ((locationType === 'division' || locationType === 'district') && !parentId) {
            newErrors.parentId = 'Parent location is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newLocation = {
            name,
            code,
            parentId
        };

        onSubmit(newLocation);

        // Reset form
        setName('');
        setCode('');
        setParentId('');
        setErrors({});
    };

    const getTitleByLocationType = () => {
        switch (locationType) {
            case 'country':
                return 'Add New Country';
            case 'division':
                return 'Add New Division';
            case 'district':
                return 'Add New District';
            default:
                return 'Add New Location';
        }
    };

    const getIconByLocationType = () => {
        switch (locationType) {
            case 'country':
                return <FlagIcon color="primary" />;
            case 'division':
                return <DivisionIcon color="primary" />;
            case 'district':
                return <DistrictIcon color="primary" />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                        {getIconByLocationType()}
                        <Typography variant="h6">{getTitleByLocationType()}</Typography>
                    </Box>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box py={2}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        required
                    />

                    {locationType === 'country' && (
                        <TextField
                            fullWidth
                            label="Country Code (ISO)"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            margin="normal"
                            variant="outlined"
                            placeholder="e.g., US, CA, GB"
                            inputProps={{ maxLength: 2 }}
                            error={Boolean(errors.code)}
                            helperText={errors.code || 'Two-letter ISO country code'}
                            required
                        />
                    )}

                    {locationType === 'division' && (
                        <FormControl
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={Boolean(errors.parentId)}
                            required
                        >
                            <InputLabel>Select Country</InputLabel>
                            <Select
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                                label="Select Country"
                            >
                                {countries.filter(country => country.active).map((country) => (
                                    <MenuItem key={country.id} value={country.id.toString()}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <FlagIcon fontSize="small" />
                                            {country.name}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.parentId && <FormHelperText>{errors.parentId}</FormHelperText>}
                        </FormControl>
                    )}

                    {locationType === 'district' && (
                        <FormControl
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={Boolean(errors.parentId)}
                            required
                        >
                            <InputLabel>Select Division</InputLabel>
                            <Select
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                                label="Select Division"
                            >
                                {divisions.filter(division => division.active).map((division) => (
                                    <MenuItem key={division.id} value={division.id.toString()}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <DivisionIcon fontSize="small" />
                                            {division.name} ({division.countryName})
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.parentId && <FormHelperText>{errors.parentId}</FormHelperText>}
                        </FormControl>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddLocationDialog;