import React from 'react';
import { useParams } from 'react-router';
import {
    Box,
    Container,
    Typography,
    Breadcrumbs,
    Link,
    Divider,
    IconButton,
    Avatar,
    Paper,
    Chip
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkIcon from '@mui/icons-material/Link';
import ReactMarkdown from 'react-markdown';

// Import sample blog data
import blogPosts from '../sampleBlogData';
import RootLayout from '../layouts/RootLayout';

const BlogDetailsPage = () => {
    const { slug } = useParams();

    // Find the blog post with the matching slug
    const post = blogPosts.find(post => post.slug === slug);

    // Handle case where blog post is not found
    if (!post) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ width: '80%', mx: 'auto' }}>
                    <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                        Blog post not found
                    </Typography>
                    <Link component={RouterLink} to="/blog">
                        Return to blog list
                    </Link>
                </Box>
            </Container>
        );
    }

    // Function to copy the current URL to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
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
                        <Link component={RouterLink} to="/blogs" color="inherit">Blog</Link>
                        <Typography color="text.primary">{post.title}</Typography>
                    </Breadcrumbs>

                    {/* Blog Title */}
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            mb: 3,
                            fontWeight: 'bold'
                        }}
                    >
                        {post.title}
                    </Typography>

                    {/* Cover Image */}
                    <Box
                        component="img"
                        src={post.image}
                        alt={post.title}
                        sx={{
                            width: '100%',
                            height: { xs: 200, sm: 300, md: 400 },
                            objectFit: 'cover',
                            borderRadius: 2,
                            mb: 2
                        }}
                    />

                    {/* Meta Info and Social Share */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 0 },
                        mb: 4
                    }}>
                        {/* Date and Read Time */}
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarTodayIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">{post.date}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">{post.readTime}</Typography>
                            </Box>
                        </Box>

                        {/* Social Share Icons */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                size="small"
                                sx={{ color: '#3b5998' }}
                                aria-label="share on Facebook"
                                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{ color: '#1DA1F2' }}
                                aria-label="share on Twitter"
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{ color: '#0077b5' }}
                                aria-label="share on LinkedIn"
                                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                            >
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{ color: '#25D366' }}
                                aria-label="share on WhatsApp"
                                onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')}
                            >
                                <WhatsAppIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{ color: 'text.primary' }}
                                aria-label="copy link"
                                onClick={copyToClipboard}
                            >
                                <LinkIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    {/* Author Information */}
                    <Paper elevation={0} sx={{ p: 2, mb: 4, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                src={post.author.avatar}
                                alt={post.author.name}
                                sx={{ width: 50, height: 50 }}
                            />
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {post.author.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.author.role}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Blog Content */}
                    <Box
                        sx={{
                            typography: 'body1',
                            lineHeight: 1.8,
                            '& h1': { mt: 4, mb: 2, fontWeight: 'bold', fontSize: '2rem' },
                            '& h2': { mt: 3, mb: 2, fontWeight: 'bold', fontSize: '1.5rem' },
                            '& h3': { mt: 3, mb: 1.5, fontWeight: 'bold', fontSize: '1.25rem' },
                            '& p': { mb: 2 },
                            '& ul, & ol': { mb: 2, pl: 4 },
                            '& li': { mb: 1 },
                            '& a': { color: 'primary.main' },
                            '& img': { maxWidth: '100%', height: 'auto', my: 2, borderRadius: 1 },
                            '& blockquote': {
                                borderLeft: '4px solid',
                                borderColor: 'primary.main',
                                pl: 2,
                                py: 1,
                                my: 2,
                                fontStyle: 'italic',
                                bgcolor: 'grey.50'
                            },
                            '& code': {
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: 'grey.100',
                                fontFamily: 'monospace'
                            }
                        }}
                    >
                        {/* If using React Markdown, you can render the content like this: */}
                        {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}

                        {/* For simple rendering without ReactMarkdown: */}
                        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
                    </Box>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {post.tags.map(tag => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{ bgcolor: 'grey.100' }}
                                />
                            ))}
                        </Box>
                    )}

                    <Divider sx={{ my: 4 }} />

                    {/* Related Posts Section */}
                    <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Related Articles
                    </Typography>

                    {/* Back to Blog Link */}
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Link
                            component={RouterLink}
                            to="/blog"
                            sx={{
                                display: 'inline-block',
                                py: 1,
                                px: 3,
                                border: '1px solid',
                                borderColor: 'primary.main',
                                borderRadius: 2,
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': {
                                    bgcolor: 'primary.main',
                                    color: 'white'
                                }
                            }}
                        >
                            Back to All Articles
                        </Link>
                    </Box>
                </Box>
            </Container>
        </RootLayout>

    );
};

export default BlogDetailsPage;