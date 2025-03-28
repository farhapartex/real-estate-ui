import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import PropertySearchForm from './search/PropertySearchForm';
import { locationService } from '../api/location';

// const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain'];
//const divisions = ['North', 'South', 'East', 'West', 'Central'];
//const districts = ['District 1', 'District 2', 'District 3', 'District 4', 'District 5'];
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

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState(null);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [divisionId, setDivisionId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);

    const fetchCountries = async () => {
        setLoading(true);

        try {
            const result = await locationService.getPublicCountries(page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                setLoading(false);
                const formattedData = data.map(country => ({
                    id: country.id,
                    name: country.name,
                    code: country.code
                }));
                setCountries(formattedData);
                setTotalItems(total);

            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchDivisions = async () => {
        setLoading(true);

        try {
            const result = await locationService.getDivisionsByCountry(countryId, page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                setLoading(false);
                const formattedData = data ? data.map(division => ({
                    id: division.id,
                    name: division.name,
                })) : [];
                setDivisions(formattedData);
                setTotalItems(total);

            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
            setDistricts([]); // Reset districts when country changes
            setDivisionId(null); // Reset division ID when country changes
        }
    }

    const fetchDistrics = async () => {
        setLoading(true);

        try {
            const result = await locationService.getDistrictByDivision(divisionId, page, pageSize);

            const { success, response } = result;
            const { data, rpage, rpageSize, total } = response;

            if (success) {
                setLoading(false);
                const formattedData = data ? data.map(district => ({
                    id: district.id,
                    name: district.name,
                })) : [];
                setDistricts(formattedData);
                setTotalItems(total);

            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCountries();
    }, [page, pageSize]);

    useEffect(() => {
        if (countryId) {
            fetchDivisions();
        }
    }, [countryId]);

    useEffect(() => {
        if (divisionId) {
            fetchDistrics();
        }
    }, [divisionId]);

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: { xs: 'auto', sm: 'auto', md: height },
                height: { xs: 'auto', sm: 'auto', md: height },
                width: '100%',
                overflow: 'visible',
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
                    position: 'relative',
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
                    countryId={countryId}
                    setCountryId={setCountryId}
                    divisions={divisions}
                    divisionId={divisionId}
                    setDivisionId={setDivisionId}
                    districts={districts}
                    districtId={districtId}
                    setDistrictId={setDistrictId}
                    propertyTypes={propertyTypes}
                />
            </Box>
        </Box>
    );
};

export default ImageTextOverlay;