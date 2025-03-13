import React from "react";
import ResponsiveTopAppBar from "../components/TopMenuBar";
import { Box, Container } from "@mui/material";
import ImageTextOverlay from "../components/ImageOverlay";
import PropertySearchForm from "../components/search/PropertySearchForm";

function RootLayout() {

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
            </Box>
        </div>
    )
}

export default RootLayout;