import React from "react";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
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


    return isAuthenticated ? <Outlet /> : navigate("/login")
}


export default ProtectedRoute;