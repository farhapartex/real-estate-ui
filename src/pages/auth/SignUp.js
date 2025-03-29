import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    Link,
    InputAdornment,
    IconButton,
    Divider,
    Stack,
    Grid,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { authService } from '../../api/authService';
import SignupSuccess from '../../components/auth/SignUpSuccess';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        const newValue = name === 'agreeToTerms' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.last_name.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone_number) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            const payload = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone_number: formData.phone_number,
                password: formData.password
            }
            try {
                const result = await authService.signup(payload);
                if (result.success) {
                    setSignupSuccess(true);
                } else {
                    setApiError(result.message || 'Registration failed. Please try again.');
                }
            } catch (error) {
                if (error.response?.data?.message) {
                    setApiError(error.response.data.message);
                } else if (error.message === 'userExistsWithEmail') {
                    setApiError('This email is already registered. Please use a different email or try to login.');
                } else {
                    setApiError('An error occurred during registration. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1
            }}
        >
            <Container component="main" maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            color: '#000',
                            mb: 1
                        }}
                    >
                        Ghor
                    </Typography>
                    {!signupSuccess ? (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                Create your account
                            </Typography>

                            {/* Form */}
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            name="first_name"
                                            autoComplete="given-name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            error={Boolean(errors.firstName)}
                                            helperText={errors.firstName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="last_name"
                                            autoComplete="family-name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            error={Boolean(errors.lastName)}
                                            helperText={errors.lastName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Phone Number"
                                            name="phone_number"
                                            autoComplete="tel"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            error={Boolean(errors.phone)}
                                            helperText={errors.phone}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="new-password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            error={Boolean(errors.password)}
                                            helperText={errors.password}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => togglePasswordVisibility('password')}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            autoComplete="new-password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            error={Boolean(errors.confirmPassword)}
                                            helperText={errors.confirmPassword}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle confirm password visibility"
                                                            onClick={() => togglePasswordVisibility('confirm')}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="agreeToTerms"
                                                    checked={formData.agreeToTerms}
                                                    onChange={handleChange}
                                                    color="primary"
                                                />
                                            }
                                            label="I agree to the terms and conditions"
                                        />
                                        {errors.agreeToTerms && (
                                            <Typography variant="caption" color="error">
                                                {errors.agreeToTerms}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        mt: 3,
                                        mb: 3,
                                        py: 1.5,
                                        borderRadius: 2
                                    }}
                                >
                                    Sign Up
                                </Button>

                                <Divider sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        OR
                                    </Typography>
                                </Divider>

                                <Stack spacing={2} direction="column" sx={{ mb: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{ borderRadius: 2 }}
                                    >
                                        Continue with Google
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{ borderRadius: 2 }}
                                    >
                                        Continue with Facebook
                                    </Button>
                                </Stack>

                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Typography variant="body2">
                                        Already have an account?{' '}
                                        <Link component={RouterLink} to="/login" variant="body2">
                                            Sign In
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <SignupSuccess email={formData.email} />
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default SignupPage;