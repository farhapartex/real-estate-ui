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
import { userService } from '../../api/user';


const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    // const [searchTerm, setSearchTerm] = useState('');
    // const [typeFilter, setTypeFilter] = useState('all');
    // const [statusFilter, setStatusFilter] = useState('all');
    // const [verificationFilter, setVerificationFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // local filters
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [verificationFilter, setVerificationFilter] = useState('all');
    const [apiFilters, setApiFilters] = useState({
        role: '',
        status: '',
        emailVerified: undefined,
        search: '',
        sortBy: 'first_name',
        sortOrder: 'asc'
    });
    const [shouldFetchData, setShouldFetchData] = useState(true);


    const fetchAdminUsers = async () => {
        try {
            const result = await userService.adminUserList(page, rowsPerPage, apiFilters);
            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                let formattedData = [];
                if (data) {
                    formattedData = data.map(user => ({
                        id: user.id,
                        name: `${user.first_name} ${user.last_name}`,
                        email: user.email,
                        phone: user.phone_number,
                        type: user.role,
                        verified: user.email_verified,
                        isSuperUser: user.is_superuser,
                        status: user.status,
                        registrationDate: user.joined_at,
                        lastActive: user.last_login_at,
                    }));
                }

                setUsers(formattedData);
                setFilteredUsers(formattedData);
                setTotalItems(total);

            } else {

                setSnackbar({
                    open: true,
                    message: 'Failed to fetch users',
                    severity: 'error'
                });
            }

        }
        catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to fetch users',
                severity: 'error'
            });
        } finally {
            setLoading(false);
            setShouldFetchData(false);
        }
    }

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        fetchAdminUsers();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, typeFilter, statusFilter, verificationFilter]);

    useEffect(() => {
        if (shouldFetchData) {
            fetchAdminUsers();
        }
    }, [shouldFetchData, page, rowsPerPage, apiFilters]);

    const applyFilters = () => {
        let filtered = [...users];
        let newFilters = { ...apiFilters };
        let hasChanges = false;

        // Search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            newFilters.search = searchTerm.toLowerCase();
            hasChanges = true;
        } else if (!searchTerm && apiFilters.search) {
            newFilters.search = '';
            hasChanges = true;
        }

        if (typeFilter !== 'all') {
            newFilters.role = typeFilter;
            hasChanges = true;
        } else if (typeFilter === 'all' && apiFilters.role) {
            newFilters.role = '';
            hasChanges = true;
        }

        if (statusFilter !== 'all' && statusFilter !== apiFilters.status) {
            newFilters.status = statusFilter;
            hasChanges = true;
        } else if (statusFilter === 'all' && apiFilters.status) {
            newFilters.status = '';
            hasChanges = true;
        }
        const newVerificationValue = verificationFilter === 'all'
            ? undefined
            : (verificationFilter === 'verified');

        if (newVerificationValue !== apiFilters.emailVerified) {
            newFilters.emailVerified = newVerificationValue;
            hasChanges = true;
        }

        if (hasChanges) {
            setApiFilters(newFilters);
            setPage(0); // Reset to first page
            setShouldFetchData(true); // This will trigger the API call
        }
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setTypeFilter('all');
        setStatusFilter('all');
        setVerificationFilter('all');

        setApiFilters({
            role: '',
            status: '',
            emailVerified: undefined,
            search: '',
            sortBy: 'first_name',
            sortOrder: 'asc'
        });
        setPage(0);
        setShouldFetchData(true);
    };

    const handleRefresh = () => {
        setShouldFetchData(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setShouldFetchData(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setShouldFetchData(true);
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