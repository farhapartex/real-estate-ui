import React from 'react';
import { Box, Typography } from '@mui/material';
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
    return (
        <Box
            sx={{
                position: 'relative',
                height: height,
                width: '100%',
                overflow: 'hidden',
                borderRadius: 2,
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
                    opacity: imageOpacity,
                    zIndex: 0,
                }}
            />

            {/* Centered Text */}
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
                    padding: 3,
                }}
            >
                {/* <Typography
                    variant={textVariant}
                    color={textColor}
                    align="center"
                    sx={{
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
                    }}
                >
                    {text}
                </Typography> */}
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