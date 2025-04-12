import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Paper,
    CircularProgress,
    Button,
    Fade,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { authService } from '../../api/authService';

// Helper function to extract token from URL query parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const EmailVerification = () => {
    const [verificationState, setVerificationState] = useState('loading'); // loading, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const query = useQuery();
    const token = query.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            // Check if token exists in URL
            if (!token) {
                setVerificationState('error');
                setErrorMessage('Verification token is missing');
                return;
            }

            try {
                // Replace with your API endpoint
                const result = await authService.emailVerification({ token });
                console.log(result);
                if (result.success) {
                    const data = result.data;
                    if (data.success) {
                        setVerificationState('success');
                        navigate("/login");
                    } else {
                        setVerificationState('error');
                        setErrorMessage(data.message || 'Verification failed. Please try again.');
                        return;
                    }

                } else {
                    setVerificationState('error');
                    setErrorMessage(result.error);
                    return;
                }

                // If verification is successful

            } catch (error) {
                setVerificationState('error');
                setErrorMessage(
                    error.response?.data?.message ||
                    'Verification failed. Please try again or contact support.'
                );
            }
        };

        // Start verification process
        verifyEmail();
    }, [token]);

    const handleGoToLogin = () => {
        navigate('/login');
    };

    const handleGoToHome = () => {
        navigate('/');
    };

    const handleTryAgain = () => {
        window.location.reload();
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    py: 4,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 2,
                    }}
                >
                    {verificationState === 'loading' && (
                        <Fade in={true}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress size={60} sx={{ mb: 3 }} />
                                <Typography variant="h5" gutterBottom>
                                    Verifying Your Email
                                </Typography>
                                <Typography color="textSecondary" variant="body1">
                                    Please wait while we verify your email address...
                                </Typography>
                            </Box>
                        </Fade>
                    )}

                    {verificationState === 'success' && (
                        <Fade in={true}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CheckCircleIcon
                                    sx={{ fontSize: 60, color: 'success.main', mb: 3 }}
                                />
                                <Typography variant="h5" gutterBottom>
                                    Email Verified Successfully!
                                </Typography>
                                <Typography color="textSecondary" variant="body1" paragraph>
                                    Thank you for verifying your email address. Your account is now fully activated.
                                </Typography>
                                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleGoToLogin}
                                    >
                                        Go to Login
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleGoToHome}
                                    >
                                        Go to Homepage
                                    </Button>
                                </Box>
                            </Box>
                        </Fade>
                    )}

                    {verificationState === 'error' && (
                        <Fade in={true}>
                            <Box sx={{ textAlign: 'center' }}>
                                <ErrorIcon
                                    sx={{ fontSize: 60, color: 'error.main', mb: 3 }}
                                />
                                <Typography variant="h5" gutterBottom>
                                    Verification Failed
                                </Typography>
                                <Typography color="textSecondary" variant="body1" paragraph>
                                    {errorMessage}
                                </Typography>
                                <Box sx={{ mt: 3 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleTryAgain}
                                        sx={{ mr: 2 }}
                                    >
                                        Try Again
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleGoToHome}
                                    >
                                        Go to Homepage
                                    </Button>
                                </Box>
                            </Box>
                        </Fade>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default EmailVerification;