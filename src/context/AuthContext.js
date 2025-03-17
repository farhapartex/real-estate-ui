import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    }


    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    setLoading(false);
                    return
                }

                const response = await authService.me();
                if (response.success) {
                    setUser(response.user)
                    setIsAuthenticated(true)
                } else {
                    localStorage.removeItem("token")
                    localStorage.removeItem("refrechToken")
                }
            } catch (error) {
                console.error("Auth check error: ", error)
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);


    useEffect(() => {
        setIsAuthenticated(!!user);
    }, [user]);

    const hasRole = (requiredRole) => {
        return user && user.role === requiredRole;
    };


    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, loading, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};