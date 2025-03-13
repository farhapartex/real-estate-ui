import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router';

const PropertySubmissionCta = ({
    message = "Do you want your property to be listed here?",
    buttonText = "Submit it now!",
    linkTo = "/submit-property"
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 3,
                boxShadow: 2,
                p: 4,
                mt: 5,
                mb: 5,
                mx: 'auto',
                maxWidth: '80%',
                border: '1px solid',
                borderColor: 'divider',
                gap: { xs: 3, md: 0 }
            }}
        >
            {/* Left side text */}
            <Typography
                variant="h6"
                component="div"
                sx={{
                    fontWeight: 'medium',
                    textAlign: { xs: 'center', md: 'left' }
                }}
            >
                {message}
            </Typography>

            {/* Right side button/link */}
            <Button
                component={RouterLink}
                to={linkTo}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AddIcon />}
                sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    fontWeight: 'bold',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                    },
                    transition: 'transform 0.2s, box-shadow 0.2s'
                }}
            >
                {buttonText}
            </Button>
        </Box>
    );
};

export default PropertySubmissionCta;