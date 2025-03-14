import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Breadcrumbs,
    Link,
    Divider
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router';
import RootLayout from '../layouts/RootLayout';

const TermsConditionsPage = () => {
    return (
        <RootLayout>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ mb: 3 }}
                >
                    <Link
                        underline="hover"
                        color="inherit"
                        component={RouterLink}
                        to="/"
                    >
                        Home
                    </Link>
                    <Typography color="text.primary">Terms & Conditions</Typography>
                </Breadcrumbs>

                <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Terms & Conditions
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
                        Last Updated: March 14, 2025
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            1. Introduction
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Welcome to Ghor. These Terms and Conditions govern your use of our website and services. By accessing or using Ghor, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            2. Definitions
                        </Typography>
                        <Typography variant="body1" paragraph>
                            "Ghor" refers to our company, our website, and any related services or platforms.
                            "User," "you," and "your" refers to the individual or entity using our services.
                            "Content" includes text, images, videos, and other materials displayed on our platform.
                            "Property Listings" refers to real estate listings posted on our platform.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            3. User Accounts
                        </Typography>
                        <Typography variant="body1" paragraph>
                            When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account or any other breach of security.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            4. Property Listings
                        </Typography>
                        <Typography variant="body1" paragraph>
                            All property listings on Ghor are provided for informational purposes only. While we strive to ensure the accuracy of information presented, we cannot guarantee that all details are complete or correct. It is the user's responsibility to verify all information before making any decisions based on property listings.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            5. Intellectual Property
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The content on Ghor, including but not limited to text, graphics, logos, and software, is the property of Ghor and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            6. User Conduct
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You agree not to use Ghor for any unlawful purposes or to conduct any unlawful activity, including, but not limited to, fraud, embezzlement, money laundering, or identity theft. Ghor reserves the right to terminate accounts and take appropriate legal action for any illegal or unauthorized use of the service.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            7. Disclaimers
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Ghor provides its services "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free. Ghor is not responsible for any loss of data or financial decisions made based on information from our platform.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            8. Limitation of Liability
                        </Typography>
                        <Typography variant="body1" paragraph>
                            In no event shall Ghor be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            9. Changes to Terms
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the platform after such modifications will constitute your acknowledgment and agreement to the modified terms.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            10. Contact Us
                        </Typography>
                        <Typography variant="body1" paragraph>
                            If you have any questions about these Terms, please contact us at legal@ghor.com.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </RootLayout>
    );
};

export default TermsConditionsPage;