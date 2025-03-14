import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Link,
    Breadcrumbs
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Import sample blog data
import blogPosts from '../sampleBlogData';
import RootLayout from '../layouts/RootLayout';

const BlogListPage = () => {
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
                        <Typography color="text.primary">Blog</Typography>
                    </Breadcrumbs>

                    {/* Page Title */}
                    <Typography
                        variant="h4"
                        component="h1"
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
                        Real Estate Insights
                    </Typography>

                    {/* Blog Grid */}
                    <Grid container spacing={4}>
                        {blogPosts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                        }
                                    }}
                                >
                                    {/* Blog Image */}
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={post.image}
                                        alt={post.title}
                                        sx={{ objectFit: 'cover' }}
                                    />

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        {/* Blog Title */}
                                        <Link
                                            component={RouterLink}
                                            to={`/blog/${post.slug}`}
                                            underline="none"
                                            color="inherit"
                                        >
                                            <Typography
                                                variant="h6"
                                                component="h2"
                                                gutterBottom
                                                sx={{
                                                    fontWeight: 'bold',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    '&:hover': { color: 'primary.main' }
                                                }}
                                            >
                                                {post.title}
                                            </Typography>
                                        </Link>

                                        {/* Meta Information */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                mt: 2,
                                                color: 'text.secondary',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {/* Date */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: 1 }}>
                                                <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="body2">{post.date}</Typography>
                                            </Box>

                                            {/* Read Time */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="body2">{post.readTime}</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </RootLayout>

    );
};

export default BlogListPage;