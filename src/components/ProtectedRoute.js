import React from "react";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate, Outlet } from "react-router";
import { authService } from "../api/authService";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();
    let navigate = useNavigate();

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (allowedRoles.length === 0 || user && allowedRoles.includes(user.role)) {
        return <Outlet />;
    }


    return navigate(authService.getHomeRoute(user));
}


export default ProtectedRoute;