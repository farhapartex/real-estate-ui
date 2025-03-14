import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Breadcrumbs,
    Link,
    Divider,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router';
import RootLayout from '../layouts/RootLayout';

const PrivacyPolicyPage = () => {
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
                    <Typography color="text.primary">Privacy Policy</Typography>
                </Breadcrumbs>

                <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Privacy Policy
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
                        Last Updated: March 14, 2025
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1" paragraph>
                            At Ghor, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            1. Information We Collect
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, or make purchases through the site. This information may include:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Personal Identification Information (Name, email address, phone number, etc.)" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Profile Information (Profile pictures, biographical information, preferences)" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Payment Information (Credit card details, billing address)" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Property Search Preferences (Location, price range, amenities, etc.)" />
                            </ListItem>
                        </List>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            2. How We Use Your Information
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We may use the information we collect for various purposes, including to:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Provide, maintain, and improve our services" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Process transactions and send related information" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Send administrative messages, updates, and promotional materials" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Respond to your comments, questions, and requests" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Personalize your experience and provide content recommendations" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Monitor and analyze trends, usage, and activity" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Detect, investigate, and prevent fraudulent transactions and other illegal activities" />
                            </ListItem>
                        </List>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            3. Sharing Your Information
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We may share the information we collect in various ways, including:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="With Vendors and Service Providers"
                                    secondary="We may share your information with vendors and service providers who perform services on our behalf."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="With Property Agents and Sellers"
                                    secondary="When you express interest in a property, we may share your information with the relevant agents or sellers."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="For Legal Reasons"
                                    secondary="We may disclose your information if we believe it is necessary to comply with applicable laws, regulations, or legal processes."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="With Your Consent"
                                    secondary="We may share your information when you give us your consent to do so."
                                />
                            </ListItem>
                        </List>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            4. Cookies and Tracking Technologies
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We use cookies and similar tracking technologies to track activity on our site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            5. Data Security
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our site.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            6. Your Rights and Choices
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You have several choices regarding the use of information on our services:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Account Information"
                                    secondary="You may update, correct, or delete your account information at any time by logging into your account and modifying your profile."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Marketing Communications"
                                    secondary="You can opt out of receiving promotional emails from us by following the instructions in those emails."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Cookies"
                                    secondary="Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies."
                                />
                            </ListItem>
                        </List>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            7. Children's Privacy
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            8. Changes to This Privacy Policy
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date. You are advised to review this privacy policy periodically for any changes.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            9. Contact Us
                        </Typography>
                        <Typography variant="body1" paragraph>
                            If you have any questions about this Privacy Policy, please contact us at privacy@ghor.com.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </RootLayout>
    );
};

export default PrivacyPolicyPage;