// File: UserManagement.jsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Grid,
    Snackbar,
    Alert
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import UserFilters from '../../components/admin/UserFilters';
import UsersTable from '../../components/admin/UsersTable';
import UserDetailsDialog from '../../components/admin/UserDetailsDialog';
import AdminLayout from '../../layouts/AdminLayout';
import { mockUsers } from "../../mockUsers";


const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [verificationFilter, setVerificationFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setUsers(mockUsers);
            setFilteredUsers(mockUsers);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, typeFilter, statusFilter, verificationFilter, users]);

    const applyFilters = () => {
        let filtered = [...users];

        // Search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.phone.toLowerCase().includes(term)
            );
        }

        // Type filter
        if (typeFilter !== 'all') {
            filtered = filtered.filter(user => user.type === typeFilter);
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        // Verification filter
        if (verificationFilter !== 'all') {
            const isVerified = verificationFilter === 'verified';
            filtered = filtered.filter(user => user.verified === isVerified);
        }

        setFilteredUsers(filtered);
        setPage(0); // Reset to first page when filters are applied
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setTypeFilter('all');
        setStatusFilter('all');
        setVerificationFilter('all');
    };

    const handleRefresh = () => {
        setLoading(true);
        // In a real application, this would fetch fresh data from the API
        setTimeout(() => {
            setUsers(mockUsers);
            setFilteredUsers(mockUsers);
            setLoading(false);
        }, 1000);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenUserDetails = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleStatusToggle = (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

        // Update the user in both state arrays
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, status: newStatus } : user
        );

        setUsers(updatedUsers);

        // If user details dialog is open, update the selected user
        if (selectedUser && selectedUser.id === userId) {
            setSelectedUser({ ...selectedUser, status: newStatus });
        }

        setSnackbar({
            open: true,
            message: `User status changed to ${newStatus}`,
            severity: 'success'
        });
    };

    const handleRoleChange = (userId, newRole) => {
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, type: newRole } : user
        );

        setUsers(updatedUsers);

        // If user details dialog is open, update the selected user
        if (selectedUser && selectedUser.id === userId) {
            setSelectedUser({ ...selectedUser, type: newRole });
        }

        setSnackbar({
            open: true,
            message: `User role changed to ${newRole}`,
            severity: 'success'
        });
    };

    const handleVerifyUser = (userId) => {
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, verified: true } : user
        );

        setUsers(updatedUsers);

        // If user details dialog is open and is the same user
        if (selectedUser && selectedUser.id === userId) {
            setSelectedUser({ ...selectedUser, verified: true });

            // Update verification documents if any are pending
            if (selectedUser.verificationDocuments.length > 0) {
                const updatedDocs = selectedUser.verificationDocuments.map(doc =>
                    doc.status === 'pending' ? { ...doc, status: 'verified' } : doc
                );
                setSelectedUser({ ...selectedUser, verified: true, verificationDocuments: updatedDocs });
            }
        }

        setSnackbar({
            open: true,
            message: `User verified successfully`,
            severity: 'success'
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <AdminLayout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        User Management
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RefreshIcon />}
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        Refresh
                    </Button>
                </Box>

                {/* Filters Section */}
                <UserFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    verificationFilter={verificationFilter}
                    setVerificationFilter={setVerificationFilter}
                    handleResetFilters={handleResetFilters}
                />

                {/* Users Table */}
                <UsersTable
                    filteredUsers={filteredUsers}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleOpenUserDetails={handleOpenUserDetails}
                    handleStatusToggle={handleStatusToggle}
                    handleVerifyUser={handleVerifyUser}
                />

                {/* User Details Dialog */}
                {selectedUser && (
                    <UserDetailsDialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        user={selectedUser}
                        onStatusToggle={handleStatusToggle}
                        onRoleChange={handleRoleChange}
                        onVerify={handleVerifyUser}
                    />
                )}

                {/* Notification Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </AdminLayout>
    );
};

export default UserManagement;