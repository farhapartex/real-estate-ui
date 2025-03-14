import React from "react";
import ResponsiveTopAppBar from "../components/TopMenuBar";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Footer from "../components/Footer";
import AdminTopAppBar from "../components/AdminTopMenuBar";

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

const AdminLayout = ({ children }) => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AdminTopAppBar />
            <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                {children}

                <Footer companyName="Ghor" />
            </Box>
        </ThemeProvider>
    )
}

export default AdminLayout;