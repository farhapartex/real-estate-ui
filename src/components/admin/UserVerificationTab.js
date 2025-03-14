// File: components/details/UserVerificationTab.jsx
import React from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Button,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Chip,
    Box,
    Alert,
    Paper,
    Stack
} from '@mui/material';
import {
    VerifiedUser as VerifiedIcon,
    InsertDriveFile as FileIcon,
    Check as CheckIcon,
    Pending as PendingIcon,
    Security as SecurityIcon,
    Cancel as CancelIcon,
    ErrorOutline as ErrorIcon
} from '@mui/icons-material';

import { formatDate, getDocumentStatusInfo } from '../utils/userUtils';

const UserVerificationTab = ({ user, onVerify }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title="Verification Status"
                        subheader={user.verified
                            ? "This user has been verified"
                            : "This user is not verified yet"}
                        action={
                            !user.verified && user.type === 'landlord' && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<VerifiedIcon />}
                                    onClick={onVerify}
                                >
                                    Verify User
                                </Button>
                            )
                        }
                    />
                    <CardContent>
                        {user.verified ? (
                            <Alert severity="success" icon={<VerifiedIcon />}>
                                This user is verified and can perform all actions related to their role.
                            </Alert>
                        ) : (
                            user.type === 'landlord' ? (
                                <Alert severity="warning" icon={<SecurityIcon />}>
                                    This landlord requires verification to list properties and access all platform features.
                                </Alert>
                            ) : (
                                <Alert severity="info" icon={<SecurityIcon />}>
                                    Verification is not required for this user type.
                                </Alert>
                            )
                        )}

                        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                            Verification Documents
                        </Typography>

                        {user.type === 'landlord' ? (
                            user.verificationDocuments && user.verificationDocuments.length > 0 ? (
                                <List>
                                    {user.verificationDocuments.map((doc, index) => {
                                        const statusInfo = getDocumentStatusInfo(doc.status);
                                        return (
                                            <React.Fragment key={doc.id}>
                                                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Box>
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                <FileIcon color="primary" />
                                                                <Typography variant="subtitle1">
                                                                    {doc.type}
                                                                </Typography>
                                                            </Stack>
                                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                                Submitted on {formatDate(doc.date)}
                                                            </Typography>
                                                        </Box>
                                                        <Chip
                                                            label={statusInfo.text}
                                                            color={statusInfo.color}
                                                            icon={
                                                                doc.status === 'verified' ? <CheckIcon /> :
                                                                    doc.status === 'pending' ? <PendingIcon /> :
                                                                        <ErrorIcon />
                                                            }
                                                        />
                                                    </Stack>
                                                </Paper>
                                            </React.Fragment>
                                        );
                                    })}
                                </List>
                            ) : (
                                <Alert severity="info">
                                    No verification documents have been submitted by this user.
                                </Alert>
                            )
                        ) : (
                            <Alert severity="info">
                                Verification documents are not required for this user type.
                            </Alert>
                        )}

                        {user.type === 'landlord' && !user.verified && (
                            <Box display="flex" justifyContent="center" mt={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<VerifiedIcon />}
                                    onClick={onVerify}
                                    size="large"
                                >
                                    Approve & Verify User
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default UserVerificationTab;