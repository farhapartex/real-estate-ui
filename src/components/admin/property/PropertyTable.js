// File: components/property/PropertyTable.jsx
import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Checkbox,
    IconButton,
    Tooltip,
    Chip,
    Box,
    Typography,
    CircularProgress,
    Avatar,
    Stack,
    Divider
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    Flag as FlagIcon,
    FlagOutlined as FlagOutlinedIcon,
    Home as HomeIcon,
    Apartment as ApartmentIcon,
    Business as BusinessIcon,
    Landscape as LandscapeIcon,
    Domain as CondoIcon,
    House as HouseIcon
} from '@mui/icons-material';

// Import utility functions
import { formatDate, formatCurrency } from '../../utils/propertyUtils';

const PropertyTable = ({
    properties,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenPropertyDetails,
    handleApproveProperty,
    handleFeatureProperty,
    handleFlagProperty,
    selectedProperties,
    handlePropertySelection,
    handleSelectAll,
    loading
}) => {

    const getPropertyTypeIcon = (type) => {
        switch (type) {
            case 'apartment':
                return <ApartmentIcon fontSize="small" />;
            case 'house':
                return <HouseIcon fontSize="small" />;
            case 'condo':
                return <CondoIcon fontSize="small" />;
            case 'townhouse':
                return <HomeIcon fontSize="small" />;
            case 'land':
                return <LandscapeIcon fontSize="small" />;
            case 'commercial':
                return <BusinessIcon fontSize="small" />;
            default:
                return <HomeIcon fontSize="small" />;
        }
    };

    const getStatusChip = (status) => {
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

    // Calculate if all properties on current page are selected
    const currentPageIds = properties
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(property => property.id);

    const isAllSelected = currentPageIds.length > 0 &&
        currentPageIds.every(id => selectedProperties.includes(id));

    return (
        <Paper elevation={3}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selectedProperties.length > 0 && !isAllSelected}
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                    disabled={loading}
                                />
                            </TableCell>
                            <TableCell>Property</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Listed On</TableCell>
                            <TableCell align="center">Featured</TableCell>
                            <TableCell align="center">Flagged</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow style={{ height: 53 * 5 }}>
                                <TableCell colSpan={10} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : properties.length === 0 ? (
                            <TableRow style={{ height: 53 }}>
                                <TableCell colSpan={10} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No properties found matching your criteria
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            properties
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((property) => (
                                    <TableRow
                                        hover
                                        key={property.id}
                                        selected={selectedProperties.includes(property.id)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedProperties.includes(property.id)}
                                                onChange={() => handlePropertySelection(property.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="flex-start">
                                                <Box
                                                    component="img"
                                                    src={property.images[0] || "/placeholder.jpg"}
                                                    alt={property.title}
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 1,
                                                        mr: 2,
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <Box>
                                                    <Typography variant="subtitle2">{property.title}</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {property.address}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {property.bedrooms} beds • {property.bathrooms} baths • {property.area} sq ft
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Avatar
                                                    sx={{ width: 30, height: 30 }}
                                                    src={property.owner.avatar}
                                                >
                                                    {property.owner.name.charAt(0)}
                                                </Avatar>
                                                <Typography variant="body2">{property.owner.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                icon={getPropertyTypeIcon(property.type)}
                                                label={property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>{formatCurrency(property.price)}</TableCell>
                                        <TableCell>{getStatusChip(property.status)}</TableCell>
                                        <TableCell>{formatDate(property.listedOn)}</TableCell>
                                        <TableCell align="center">
                                            {property.featured ? (
                                                <StarIcon color="warning" />
                                            ) : (
                                                <StarBorderIcon color="action" />
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            {property.flagged ? (
                                                <FlagIcon color="error" />
                                            ) : (
                                                <FlagOutlinedIcon color="action" />
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                <Tooltip title="View Details">
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => handleOpenPropertyDetails(property)}
                                                    >
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                {property.status === 'pending' && (
                                                    <Tooltip title="Approve Property">
                                                        <IconButton
                                                            size="small"
                                                            color="success"
                                                            onClick={() => handleApproveProperty(property.id)}
                                                        >
                                                            <CheckCircleIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}

                                                <Tooltip title={property.featured ? "Unfeature Property" : "Feature Property"}>
                                                    <IconButton
                                                        size="small"
                                                        color="warning"
                                                        onClick={() => handleFeatureProperty(property.id, property.featured)}
                                                    >
                                                        {property.featured ? (
                                                            <StarIcon fontSize="small" />
                                                        ) : (
                                                            <StarBorderIcon fontSize="small" />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title={property.flagged ? "Remove Flag" : "Flag as Inappropriate"}>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleFlagProperty(property.id, property.flagged)}
                                                    >
                                                        {property.flagged ? (
                                                            <FlagIcon fontSize="small" />
                                                        ) : (
                                                            <FlagOutlinedIcon fontSize="small" />
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={properties.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PropertyTable;