import React from "react";
import ResponsiveTopAppBar from "../components/TopMenuBar";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Footer from "../components/Footer";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1a73e8',
        },
        secondary: {
            main: '#ff5252',
        },
    },
});

const RootLayout = ({ children }) => {

    return (
        <ThemeProvider theme={theme}>
            <ResponsiveTopAppBar />
            <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                {children}

                <Footer companyName="Ghor" />
            </Box>
        </ThemeProvider>
    )
}

export default RootLayout;