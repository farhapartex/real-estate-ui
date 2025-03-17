import * as React from 'react';
import {
    AppBar, useMediaQuery,
    useTheme
} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const pages = ['Home', 'News & Insights', 'Blog'];
const settings = ['Profile', 'Properties', 'Dashboard', 'Logout'];
const pageLinks = {
    'Home': '/',
    'News & Insights': '/news',
    'Blog': '/blogs'
};

const settingsPageLinks = {
    'Profile': '/profile',
    'Properties': '/owner/properties',
    'Dashboard': '/admin/dashboard',
    'Logout': '/logout',
};

const authLinks = {
    'Login': '/login',
    'Signup': '/signup'
};

function ResponsiveTopAppBar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const { user, isAuthenticated, loading, logout, hasRole } = useAuth();


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = (setting) => {
        handleCloseUserMenu();
        if (setting === 'Logout') {
            // Call the logout function from auth context
            logout();
        } else {
            navigate(settingsPageLinks[setting])
        }
    };

    return (
        <AppBar position="static" sx={{
            background: '#f8f8f8'
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#000',
                            textDecoration: 'none',
                        }}
                    >
                        Ghor
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="#000"
                        >
                            <MenuIcon sx={{ color: '#000', }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, color: '#000', }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ color: '#000', }} href='/'>
                                    <Typography sx={{ textAlign: 'center', color: '#000', textDecoration: 'none' }} component={'a'} href={pageLinks[page]}>{page}</Typography>
                                </MenuItem>
                            ))}

                            {/* Add Login/Signup to mobile menu when not logged in */}
                            {!isAuthenticated && (
                                <>
                                    <MenuItem onClick={() => navigate(authLinks['Login'])} sx={{ color: '#000' }}>
                                        <Typography sx={{ textAlign: 'center', color: '#000', textDecoration: 'none' }}>Login</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate(authLinks['Signup'])} sx={{ color: '#000' }}>
                                        <Typography sx={{ textAlign: 'center', color: '#000', textDecoration: 'none' }}>Signup</Typography>
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#000',
                            textDecoration: 'none',
                        }}
                    >
                        Ghor
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: '#000', display: 'block' }}
                                href={pageLinks[page]}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Conditional rendering based on login status */}
                    <Box sx={{ flexGrow: 0 }}>
                        {isAuthenticated ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={() => handleMenuItemClick(setting)}
                                        >
                                            <Typography sx={{ textAlign: 'center', color: '#000', }}>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            // Show Login and Signup buttons when not logged in
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Button
                                    onClick={() => navigate(authLinks['Login'])}
                                    sx={{
                                        my: 2,
                                        mx: 1,
                                        color: '#000',
                                        display: 'block',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => navigate(authLinks['Signup'])}
                                    sx={{
                                        my: 2,
                                        mx: 1,
                                        color: '#fff',
                                        backgroundColor: '#1976d2',
                                        display: 'block',
                                        '&:hover': {
                                            backgroundColor: '#1565c0'
                                        }
                                    }}
                                >
                                    Signup
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveTopAppBar;