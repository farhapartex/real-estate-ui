import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid
} from '@mui/material';
import PropertyDetailsModal from './modals/PropertyDetailsModal';
import PropertyCard from './PropertyCard';



const FeaturedProperties = ({
    title = "Featured Properties",
    properties = []
}) => {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const displayProperties = properties.slice(0, 20);

    const handleCardClick = (property) => {
        setSelectedProperty(property);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Box sx={{ py: 6, px: 2, maxWidth: '80%', margin: 'auto' }}>
            {/* Section Title */}
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    mb: 4,
                    fontWeight: 'bold',
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: 80,
                        height: 4,
                        backgroundColor: 'primary.main',
                    }
                }}
            >
                {title}
            </Typography>

            {/* Properties Grid */}
            <Grid container spacing={3}>
                {displayProperties.map((property) => (
                    <Grid item xs={12} sm={6} md={3} key={property.id}>
                        <PropertyCard property={property} onCardClick={handleCardClick} />
                    </Grid>
                ))}
            </Grid>

            {/* Property Details Modal */}
            <PropertyDetailsModal
                open={modalOpen}
                onClose={handleCloseModal}
                property={selectedProperty}
            />
        </Box>
    );
};

export default FeaturedProperties;