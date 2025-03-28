// File: components/location/EditLocationDialog.jsx
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
    LocationOn as DistrictIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { locationService } from '../../../api/location';

const EditLocationDialog = ({
    open,
    onClose,
    onSubmit,
    locationType,
    location,
    countries,
    divisions,
    setDivisions
}) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [parentId, setParentId] = useState('');
    const [errors, setErrors] = useState({});

    const fetchDivisions = async () => {

        try {
            const result = await locationService.divisionList(1, 10);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                const formattedData = data.map(division => ({
                    id: division.id,
                    name: division.name,
                    country: division.country,
                    status: division.status,
                    districts: division.districts
                }));

                setDivisions(formattedData);

            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            //setLoading(false);
        }
    }

    // Set form values on location change
    useEffect(() => {
        if (location) {
            setName(location.name || '');

            if (locationType === 'country') {
                setCode(location.code || '');
            } else if (locationType === 'division') {
                setParentId(location.country.id ? location.country.id.toString() : '');
            } else if (locationType === 'district') {
                if (divisions.length === 0) {
                    fetchDivisions();
                }
                setParentId(location.divisionId ? location.divisionId.toString() : '');
            }

            setErrors({});
        }
    }, [location, locationType]);

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

        const updatedLocation = {
            ...location,
            name,
            code,
            parentId
        };

        onSubmit(updatedLocation);
    };

    const getTitleByLocationType = () => {
        switch (locationType) {
            case 'country':
                return 'Edit Country';
            case 'division':
                return 'Edit Division';
            case 'district':
                return 'Edit District';
            default:
                return 'Edit Location';
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
                                {countries.filter(country => country.status).map((country) => (
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
                                {divisions.filter(division => division.status).map((division) => (
                                    <MenuItem key={division.id} value={division.id.toString()}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <DivisionIcon fontSize="small" />
                                            {division.name} ({division.country.name})
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
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditLocationDialog;