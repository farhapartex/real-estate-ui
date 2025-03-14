import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import PropertySearchForm from './search/PropertySearchForm';

const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain'];
const divisions = ['North', 'South', 'East', 'West', 'Central'];
const districts = ['District 1', 'District 2', 'District 3', 'District 4', 'District 5'];
const propertyTypes = ['Apartment', 'House', 'Villa', 'Condo', 'Townhouse', 'Land', 'Commercial'];

const ImageTextOverlay = ({
    backgroundImage,
    text,
    imageOpacity = 0.5,
    height = 300,
    textColor = 'white',
    textVariant = 'h4'
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: 550, sm: 500, md: height },
                width: '100%',
                overflow: 'hidden',
                borderRadius: { xs: 0, sm: 1, md: 2 },
                boxShadow: 3,
            }}
        >
            {/* Background Image with reduced opacity */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: imageOpacity,
                    zIndex: -1,
                }}
            />

            {/* Centered Content */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    padding: { xs: 1, sm: 2, md: 3 },
                }}
            >
                {text && (
                    <Typography
                        variant={textVariant}
                        color={textColor}
                        align="center"
                        sx={{
                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
                            marginBottom: 2,
                            display: 'none', // Hide text when form is shown
                        }}
                    >
                        {text}
                    </Typography>
                )}

                <PropertySearchForm
                    countries={countries}
                    divisions={divisions}
                    districts={districts}
                    propertyTypes={propertyTypes}
                />
            </Box>
        </Box>
    );
};

export default ImageTextOverlay;