// File: components/location/DivisionList.jsx
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
    LocationCity as DivisionIcon,
    Flag as FlagIcon
} from '@mui/icons-material';

const DivisionList = ({ divisions, loading, onEdit, onDelete, onToggleStatus }) => {
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
                            <TableCell>Division Name</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Districts</TableCell>
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
                        ) : divisions.length === 0 ? (
                            <TableRow style={{ height: 53 }}>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No divisions found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            divisions
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((division) => (
                                    <TableRow hover key={division.id}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <DivisionIcon color="primary" />
                                                <Typography variant="body1">{division.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <FlagIcon fontSize="small" color="action" />
                                                <Typography variant="body2">{division.country.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            {division.status ? (
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
                                            <Chip
                                                label={division.districts}
                                                color={division.districts > 0 ? "info" : "default"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                <Tooltip title={division.status ? "Deactivate" : "Activate"}>
                                                    <IconButton
                                                        size="small"
                                                        color={division.status ? "success" : "default"}
                                                        onClick={() => onToggleStatus(division)}
                                                    >
                                                        {division.status ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => onEdit(division)}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => onDelete(division)}
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
                count={divisions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default DivisionList;