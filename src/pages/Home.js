import React from "react";
import RootLayout from "../layouts/RootLayout";
import ImageTextOverlay from "../components/ImageOverlay";
import FeaturedProperties from "../components/FeaturedProperties";
import PropertySubmissionCta from "../components/PropertySubmissionCTA";
import featuredProperties from "../sampleData";

const Home = () => {
    // const featuredProperties = [
    //     {
    //         id: 1,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Luxury Apartment',
    //         location: 'Sylhet',
    //         country: 'Bangladesh',
    //         bedrooms: 3,
    //         bathrooms: 2,
    //         size: 1200
    //     },
    //     {
    //         id: 2,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Family Villa',
    //         location: 'Dhaka',
    //         country: 'Bangladesh',
    //         bedrooms: 4,
    //         bathrooms: 3,
    //         size: 2100
    //     },
    //     {
    //         id: 3,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Modern Condo',
    //         location: 'Chittagong',
    //         country: 'Bangladesh',
    //         bedrooms: 2,
    //         bathrooms: 2,
    //         size: 950
    //     },
    //     {
    //         id: 4,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Penthouse Suite',
    //         location: 'Sylhet',
    //         country: 'Bangladesh',
    //         bedrooms: 3,
    //         bathrooms: 3,
    //         size: 1800
    //     },
    //     {
    //         id: 5,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'City View Apartment',
    //         location: 'Dhaka',
    //         country: 'Bangladesh',
    //         bedrooms: 2,
    //         bathrooms: 1,
    //         size: 850
    //     },
    //     {
    //         id: 6,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Garden House',
    //         location: 'Rajshahi',
    //         country: 'Bangladesh',
    //         bedrooms: 4,
    //         bathrooms: 2,
    //         size: 2400
    //     },
    //     {
    //         id: 7,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Pool Villa',
    //         location: 'Cox\'s Bazar',
    //         country: 'Bangladesh',
    //         bedrooms: 5,
    //         bathrooms: 4,
    //         size: 3200
    //     },
    //     {
    //         id: 8,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Executive Apartment',
    //         location: 'Sylhet',
    //         country: 'Bangladesh',
    //         bedrooms: 3,
    //         bathrooms: 2,
    //         size: 1600
    //     },
    //     {
    //         id: 9,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Executive Apartment',
    //         location: 'Sylhet',
    //         country: 'Bangladesh',
    //         bedrooms: 3,
    //         bathrooms: 2,
    //         size: 1600
    //     },
    //     {
    //         id: 10,
    //         image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    //         name: 'Executive Apartment',
    //         location: 'Sylhet',
    //         country: 'Bangladesh',
    //         bedrooms: 3,
    //         bathrooms: 2,
    //         size: 1600
    //     }
    // ];
    return (
        <RootLayout>
            <ImageTextOverlay
                backgroundImage="https://images.unsplash.com/photo-1736077922373-1de1facfeeeb?q=80&w=750&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                text="Welcome to Ghor"
                imageOpacity={0.5}
                height={600}
                textVariant="h3"
            />

            <FeaturedProperties
                title="Featured Properties"
                properties={featuredProperties}
            />

            <PropertySubmissionCta />
        </RootLayout>
    )
}

export default Home;