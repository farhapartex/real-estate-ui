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

const PropertyFilters = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    featuredFilter,
    setFeaturedFilter,
    handleResetFilters,
    selectedTab
}) => {
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Search by title, address or owner name"
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

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small" disabled={selectedTab !== 0}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Statuses</MenuItem>
                            <MenuItem value="pending">Pending Approval</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Property Type</InputLabel>
                        <Select
                            value={typeFilter}
                            label="Property Type"
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Types</MenuItem>
                            <MenuItem value="apartment">Apartment</MenuItem>
                            <MenuItem value="house">House</MenuItem>
                            <MenuItem value="condo">Condominium</MenuItem>
                            <MenuItem value="townhouse">Townhouse</MenuItem>
                            <MenuItem value="land">Land</MenuItem>
                            <MenuItem value="commercial">Commercial</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small" disabled={selectedTab === 3}>
                        <InputLabel>Featured</InputLabel>
                        <Select
                            value={featuredFilter}
                            label="Featured"
                            onChange={(e) => setFeaturedFilter(e.target.value)}
                        >
                            <MenuItem value="all">All Properties</MenuItem>
                            <MenuItem value="featured">Featured Only</MenuItem>
                            <MenuItem value="not_featured">Not Featured</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        onClick={handleResetFilters}
                        startIcon={<FilterIcon />}
                        fullWidth
                    >
                        Reset Filters
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PropertyFilters;