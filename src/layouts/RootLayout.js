import React from "react";
import ResponsiveTopAppBar from "../components/TopMenuBar";
import { Box, Container } from "@mui/material";
import ImageTextOverlay from "../components/ImageOverlay";
import PropertySearchForm from "../components/search/PropertySearchForm";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";

function RootLayout() {

    const featuredProperties = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
            name: 'Luxury Apartment',
            location: 'Sylhet',
            country: 'Bangladesh',
            bedrooms: 3,
            bathrooms: 2,
            size: 1200
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
            name: 'Family Villa',
            location: 'Dhaka',
            country: 'Bangladesh',
            bedrooms: 4,
            bathrooms: 3,
            size: 2100
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
            name: 'Modern Condo',
            location: 'Chittagong',
            country: 'Bangladesh',
            bedrooms: 2,
            bathrooms: 2,
            size: 950
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
            name: 'Penthouse Suite',
            location: 'Sylhet',
            country: 'Bangladesh',
            bedrooms: 3,
            bathrooms: 3,
            size: 1800
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
            name: 'City View Apartment',
            location: 'Dhaka',
            country: 'Bangladesh',
            bedrooms: 2,
            bathrooms: 1,
            size: 850
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
            name: 'Garden House',
            location: 'Rajshahi',
            country: 'Bangladesh',
            bedrooms: 4,
            bathrooms: 2,
            size: 2400
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
            name: 'Pool Villa',
            location: 'Cox\'s Bazar',
            country: 'Bangladesh',
            bedrooms: 5,
            bathrooms: 4,
            size: 3200
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
            name: 'Executive Apartment',
            location: 'Sylhet',
            country: 'Bangladesh',
            bedrooms: 3,
            bathrooms: 2,
            size: 1600
        }
    ];

    return (
        <div>
            <ResponsiveTopAppBar />
            <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                <ImageTextOverlay
                    backgroundImage="https://plus.unsplash.com/premium_vector-1724080854640-d763ba44e974"
                    text="Welcome to Ghor"
                    imageOpacity={0.8}
                    height={600}
                    textVariant="h3"
                />

                <FeaturedProperties
                    title="Featured Properties"
                    properties={featuredProperties}
                />

                <Footer companyName="Ghor" />
            </Box>
        </div>
    )
}

export default RootLayout;