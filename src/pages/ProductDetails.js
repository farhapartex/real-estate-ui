import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Typography,
    Breadcrumbs,
    Link
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router';

// Sample data - in a real app, you would fetch this data based on ID
// import featuredProperties from './sampleData';
import RootLayout from '../layouts/RootLayout';
import featuredProperties from '../sampleData';

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const [mainImageIndex, setMainImageIndex] = useState(0);

    // Find the property by ID
    const property = featuredProperties.find(p => p.id.toString() === id) || featuredProperties[0];

    const {
        name,
        title,
        images,
        price,
        listingType,
        location,
        country,
        bedrooms,
        bathrooms,
        size,
        description
    } = property;

    // Handle image navigation
    const handlePrevImage = () => {
        setMainImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setMainImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const selectImage = (index) => {
        setMainImageIndex(index);
    };

    return (
        <RootLayout>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ width: '80%', mx: 'auto' }}>
                    {/* Breadcrumbs Navigation */}
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                        sx={{ mb: 3 }}
                    >
                        <Link component={RouterLink} to="/" color="inherit">Home</Link>
                        <Link component={RouterLink} to="/properties" color="inherit">Properties</Link>
                        <Typography color="text.primary">{name}</Typography>
                    </Breadcrumbs>

                    {/* Property Title and Tag */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                        <Typography variant="h4" component="h1" sx={{ mr: 2, fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                        <Chip
                            label={listingType}
                            color={listingType === 'For Sale' ? 'primary' : 'secondary'}
                            sx={{ fontWeight: 'bold' }}
                        />
                    </Box>

                    {/* Location with icon */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <LocationOnIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body1" color="text.secondary">
                            {location}, {country}
                        </Typography>
                    </Box>

                    {/* Image Gallery */}
                    <Paper elevation={2} sx={{ mb: 4, overflow: 'hidden', borderRadius: 2 }}>
                        <Box sx={{ position: 'relative' }}>
                            {/* Main Image */}
                            <Box
                                component="img"
                                src={images[mainImageIndex]}
                                alt={title}
                                sx={{
                                    width: '100%',
                                    height: { xs: 300, sm: 400, md: 500 },
                                    objectFit: 'cover',
                                }}
                            />

                            {/* Image Navigation Arrows */}
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    left: 16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                                }}
                                onClick={handlePrevImage}
                            >
                                <ArrowBackIcon />
                            </IconButton>

                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: 16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                                }}
                                onClick={handleNextImage}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        </Box>

                        {/* Thumbnail Strip */}
                        <Box
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                p: 1,
                                '&::-webkit-scrollbar': {
                                    height: 6
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    borderRadius: 3
                                }
                            }}
                        >
                            {images.map((img, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => selectImage(index)}
                                    sx={{
                                        height: 80,
                                        width: 120,
                                        objectFit: 'cover',
                                        mx: 0.5,
                                        cursor: 'pointer',
                                        borderRadius: 1,
                                        border: index === mainImageIndex ? '3px solid' : '3px solid transparent',
                                        borderColor: index === mainImageIndex ? 'primary.main' : 'transparent',
                                        opacity: index === mainImageIndex ? 1 : 0.7,
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            opacity: 1
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Paper>

                    {/* Property Info Grid */}
                    <Grid container spacing={4}>
                        {/* Left Column - Main Property Details */}
                        <Grid item xs={12} md={8}>
                            {/* Price */}
                            <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mb: 2 }}>
                                {typeof price === 'number' ? `$${price.toLocaleString()}` : price}
                                {listingType === 'For Rent' && <Typography component="span" variant="h6" color="text.secondary"> / month</Typography>}
                            </Typography>

                            {/* Property Metadata */}
                            <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 4, mb: 1 }}>
                                    <BedIcon color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>{bedrooms}</Box> Bedrooms
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 4, mb: 1 }}>
                                    <BathtubIcon color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>{bathrooms}</Box> Bathrooms
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <SquareFootIcon color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>{size?.toLocaleString()}</Box> sq.ft
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Property Description */}
                            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                                Description
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, whiteSpace: 'pre-line' }}>
                                {description}
                            </Typography>

                            {/* Property Features */}
                            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                                Features
                            </Typography>
                            <Grid container spacing={2} sx={{ mb: 4 }}>
                                {['Central Air', 'Balcony', 'Gym', 'Swimming Pool', 'Security', 'Parking', 'Garden', 'Elevator'].map((feature) => (
                                    <Grid item xs={6} sm={4} key={feature}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    bgcolor: 'primary.main',
                                                    mr: 1
                                                }}
                                            />
                                            <Typography variant="body1">{feature}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Map Location (placeholder) */}
                            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                                Location
                            </Typography>
                            <Box
                                sx={{
                                    height: 300,
                                    bgcolor: 'grey.200',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 4,
                                    borderRadius: 2
                                }}
                            >
                                <Typography>Map would be displayed here</Typography>
                            </Box>
                        </Grid>

                        {/* Right Column - Contact and Additional Info */}
                        <Grid item xs={12} md={4}>
                            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Contact Agent
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                        component="img"
                                        src="https://source.unsplash.com/random/100x100/?portrait"
                                        alt="Agent"
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: '50%',
                                            mr: 2
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Sarah Johnson
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Senior Property Consultant
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<PhoneIcon />}
                                        sx={{ mb: 1 }}
                                    >
                                        Call Agent
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<EmailIcon />}
                                    >
                                        Email Agent
                                    </Button>
                                </Box>
                            </Paper>

                            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Property Details
                                </Typography>
                                <Grid container spacing={2}>
                                    {[
                                        { label: 'Property ID', value: `GHR-${id}` },
                                        { label: 'Property Type', value: 'Apartment' },
                                        { label: 'Building Age', value: '5 Years' },
                                        { label: 'Furnished', value: 'No' },
                                        { label: 'Garage', value: '1' },
                                        { label: 'Available From', value: 'Immediately' }
                                    ].map((detail, index) => (
                                        <React.Fragment key={index}>
                                            <Grid item xs={6}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {detail.label}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    {detail.value}
                                                </Typography>
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button startIcon={<FavoriteIcon />} size="small">
                                        Save
                                    </Button>
                                    <Button startIcon={<ShareIcon />} size="small">
                                        Share
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </RootLayout>

    );
};

export default PropertyDetailsPage;