import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer = ({ companyName = "Property Finder" }) => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.grey[100]
            }}
        >
            <Divider sx={{ mb: 1 }} />
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 0 }
                    }}
                >
                    {/* Company Name - Left Side */}
                    <Typography variant="h6" color="text.primary">
                        {companyName}
                    </Typography>

                    {/* Links - Right Side */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 3
                        }}
                    >
                        <Link
                            href="/terms-and-conditions"
                            color="text.secondary"
                            underline="hover"
                            sx={{ '&:hover': { color: 'primary.main' } }}
                        >
                            Terms & Conditions
                        </Link>
                        <Link
                            href="/privacy-policy"
                            color="text.secondary"
                            underline="hover"
                            sx={{ '&:hover': { color: 'primary.main' } }}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href=""
                            color="text.secondary"
                            underline="hover"
                            sx={{ '&:hover': { color: 'primary.main' } }}
                        >
                            © {new Date().getFullYear()} {companyName}. All rights reserved.
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;