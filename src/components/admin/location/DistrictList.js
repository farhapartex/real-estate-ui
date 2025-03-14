// File: components/location/DistrictList.jsx
import React, { useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    Chip,
    Box,
    Typography,
    CircularProgress,
    Stack
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ToggleOn as ToggleOnIcon,
    ToggleOff as ToggleOffIcon,
    LocationOn as DistrictIcon,
    LocationCity as DivisionIcon,
    Flag as FlagIcon
} from '@mui/icons-material';

const DistrictList = ({ districts, loading, onEdit, onDelete, onToggleStatus }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper elevation={3}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>District Name</TableCell>
                            <TableCell>Division</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow style={{ height: 53 * 5 }}>
                                <TableCell colSpan={5} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : districts.length === 0 ? (
                            <TableRow style={{ height: 53 }}>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No districts found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            districts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((district) => (
                                    <TableRow hover key={district.id}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <DistrictIcon color="primary" />
                                                <Typography variant="body1">{district.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <DivisionIcon fontSize="small" color="action" />
                                                <Typography variant="body2">{district.divisionName}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <FlagIcon fontSize="small" color="action" />
                                                <Typography variant="body2">{district.countryName}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            {district.active ? (
                                                <Chip
                                                    label="Active"
                                                    color="success"
                                                    size="small"
                                                />
                                            ) : (
                                                <Chip
                                                    label="Inactive"
                                                    color="default"
                                                    size="small"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                <Tooltip title={district.active ? "Deactivate" : "Activate"}>
                                                    <IconButton
                                                        size="small"
                                                        color={district.active ? "success" : "default"}
                                                        onClick={() => onToggleStatus(district)}
                                                    >
                                                        {district.active ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => onEdit(district)}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => onDelete(district)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
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
                count={districts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default DistrictList;