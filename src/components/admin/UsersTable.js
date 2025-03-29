// File: components/UsersTable.jsx
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
    Box,
    Typography,
    Avatar,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Person as PersonIcon,
    BusinessCenter as LandlordIcon,
    SupervisorAccount as AdminIcon,
    People as RenterIcon,
    VerifiedUser as VerifiedIcon,
    Close as CloseIcon,
    Check as CheckIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';

// Utils component for getting user type icons
import { getUserTypeIcon, getUserStatusChip, formatDate } from '../utils/userUtils';

const UsersTable = ({
    filteredUsers,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenUserDetails,
    handleStatusToggle,
    handleVerifyUser
}) => {
    return (
        <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Contact Info</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Verified</TableCell>
                            <TableCell>Registration Date</TableCell>
                            <TableCell>Last Active</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <TableRow hover key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Box display="flex" alignItems="center">
                                            <Avatar sx={{
                                                mr: 2, bgcolor: user.type === 'admin' ? 'primary.main' :
                                                    user.type === 'owner' ? 'warning.main' : 'success.main'
                                            }}>
                                                {user.name.charAt(0)}
                                            </Avatar>
                                            <Typography variant="subtitle2">{user.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                                            <EmailIcon fontSize="small" color="action" />
                                            {user.email}
                                        </Typography>
                                        <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                                            <PhoneIcon fontSize="small" color="action" />
                                            {user.phone || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={getUserTypeIcon(user.type)}
                                            label={user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                                            size="small"
                                            color={user.type === 'admin' ? 'primary' :
                                                user.type === 'owner' ? 'warning' : 'success'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>{getUserStatusChip(user.status)}</TableCell>
                                    <TableCell>
                                        {user.verified ? (
                                            <Chip
                                                icon={<VerifiedIcon />}
                                                label="Verified"
                                                size="small"
                                                color="info"
                                            />
                                        ) : (
                                            <Chip
                                                label="Not Verified"
                                                size="small"
                                                variant="outlined"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{formatDate(user.registrationDate)}</TableCell>
                                    <TableCell>{formatDate(user.lastActive)}</TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" justifyContent="center" gap={1}>
                                            <Tooltip title="View User Details">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleOpenUserDetails(user)}
                                                >
                                                    <PersonIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}>
                                                <IconButton
                                                    size="small"
                                                    color={user.status === 'active' ? 'error' : 'success'}
                                                    onClick={() => handleStatusToggle(user.id, user.status)}
                                                >
                                                    {user.status === 'active' ? (
                                                        <CloseIcon fontSize="small" />
                                                    ) : (
                                                        <CheckIcon fontSize="small" />
                                                    )}
                                                </IconButton>
                                            </Tooltip>

                                            {user.type === 'landlord' && !user.verified && (
                                                <Tooltip title="Verify User">
                                                    <IconButton
                                                        size="small"
                                                        color="info"
                                                        onClick={() => handleVerifyUser(user.id)}
                                                    >
                                                        <VerifiedIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {filteredUsers.length === 0 && (
                            <TableRow style={{ height: 53 }}>
                                <TableCell colSpan={8} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        No users found matching your criteria
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default UsersTable;