// File: components/UserFilters.jsx
import React from 'react';
import {
    Paper,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Close as CloseIcon
} from '@mui/icons-material';

const UserFilters = ({
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    verificationFilter,
    setVerificationFilter,
    handleResetFilters
}) => {
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Search by name, email or phone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={4} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>User Type</InputLabel>
                        <Select
                            value={typeFilter}
                            label="User Type"
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Types</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="owner">Landlord</MenuItem>
                            <MenuItem value="renter">Renter</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Statuses</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Verification</InputLabel>
                        <Select
                            value={verificationFilter}
                            label="Verification"
                            onChange={(e) => setVerificationFilter(e.target.value)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="verified">Verified</MenuItem>
                            <MenuItem value="unverified">Unverified</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={2} display="flex" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        onClick={handleResetFilters}
                        startIcon={<FilterIcon />}
                    >
                        Reset Filters
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserFilters;