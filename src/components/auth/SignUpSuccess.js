import React from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    Typography,
    Link,
    Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const SignupSuccess = ({ email }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 2
            }}
        >
            <CheckCircleIcon
                color="success"
                sx={{ fontSize: 80, mb: 2 }}
            />

            <Typography variant="h5" gutterBottom fontWeight="bold">
                Registration Successful!
            </Typography>

            <Typography variant="body1" paragraph>
                Thank you for creating your account. To complete your registration,
                please verify your email address.
            </Typography>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    p: 3,
                    borderRadius: 2,
                    width: '100%',
                    mb: 3,
                    textAlign: 'left'
                }}
            >
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                    <MarkEmailReadIcon color="primary" />
                    <Typography variant="h6">Next Steps:</Typography>
                </Stack>

                <ol>
                    <li>
                        <Typography variant="body2" paragraph>
                            We've sent a verification link to <strong>{email}</strong>
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2" paragraph>
                            Check your email inbox (including spam/junk folders)
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2" paragraph>
                            Click the verification link in the email
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2">
                            Once verified, you can log in to access your account
                        </Typography>
                    </li>
                </ol>
            </Box>

            <Typography variant="body2" color="text.secondary" paragraph>
                The verification email should arrive within a few minutes.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/login')}
                >
                    Go to Login
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                >
                    Return to Home
                </Button>
            </Stack>

            <Typography variant="body2" sx={{ mt: 3 }}>
                Didn't receive the email? <Link component="button">Resend Verification Email</Link>
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Having trouble? <Link href="mailto:support@yourcompany.com">Contact Support</Link>
            </Typography>
        </Box>
    );
};

export default SignupSuccess;