import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Tabs,
    Tab,
    Grid,
    Button,
    Divider,
    Chip,
    Stack
} from '@mui/material';
import {
    Close as CloseIcon,
    CheckCircle as CheckCircleIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    Flag as FlagIcon,
    FlagOutlined as FlagOutlinedIcon,
    ToggleOn as ToggleOnIcon,
    ToggleOff as ToggleOffIcon
} from '@mui/icons-material';

import PropertyInfoTab from './PropertyInfoTab';
import PropertyImagesTab from './PropertyImagesTab';
import PropertyOwnerTab from './PropertyOwnerTab';


const PropertyDetailsDialog = ({
    open,
    onClose,
    property,
    onApprove,
    onFeature,
    onFlag
}) => {
    const [dialogTab, setDialogTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setDialogTab(newValue);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Property Details</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <Box px={3} mb={1}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Typography variant="h5" fontWeight="500">{property.title}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {property.address}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={1}>
                            {property.status === 'pending' && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<CheckCircleIcon />}
                                    onClick={() => onApprove(property.id)}
                                >
                                    Approve
                                </Button>
                            )}

                            <Button
                                variant="outlined"
                                color="warning"
                                startIcon={property.featured ? <StarIcon /> : <StarBorderIcon />}
                                onClick={() => onFeature(property.id, property.featured)}
                            >
                                {property.featured ? 'Unfeature' : 'Feature'}
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={property.flagged ? <FlagIcon /> : <FlagOutlinedIcon />}
                                onClick={() => onFlag(property.id, property.flagged)}
                            >
                                {property.flagged ? 'Unflag' : 'Flag'}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            <Tabs
                value={dialogTab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="Property Info" />
                <Tab label="Images" />
                <Tab label="Owner" />
            </Tabs>

            <DialogContent dividers>
                {dialogTab === 0 && (
                    <PropertyInfoTab property={property} />
                )}

                {dialogTab === 1 && (
                    <PropertyImagesTab images={property.images} title={property.title} />
                )}

                {dialogTab === 2 && (
                    <PropertyOwnerTab owner={property.owner} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PropertyDetailsDialog;