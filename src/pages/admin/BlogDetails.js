// File: components/blog/BlogDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    Box,
    Typography,
    Button,
    Paper,
    Divider,
    Chip,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
    Container
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Public as PublicIcon,
    Person as PersonIcon,
    Category as CategoryIcon,
    Today as TodayIcon,
    CalendarToday as CalendarIcon
} from '@mui/icons-material';
import PublicOffIcon from '@mui/icons-material/PublicOff';

// Import common components
import DeleteConfirmDialog from '../../components/admin/blog/DeleteConfirmDialog';

// Import utilities
import { formatDate, getBlogStatusChip } from '../../components/utils/blog/blogUtils';
import { mockBlogs } from '../../mockBlogs';
import AdminLayout from '../../layouts/AdminLayout';


const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });



    useEffect(() => {
        setLoading(true);

        // Find the blog by ID
        const blogId = parseInt(id);
        const foundBlog = mockBlogs.find(blog => blog.id === blogId);

        if (foundBlog) {
            setBlog(foundBlog);
        }

        setLoading(false);
    }, [id, mockBlogs]);

    const onDelete = (blogId) => {
        setBlogs(blogs.filter(blog => blog.id !== blogId));

        setSnackbar({
            open: true,
            message: 'Blog post deleted successfully',
            severity: 'success'
        });

        navigate('/admin/blogs');
    }

    const onTogglePublish = (blogId) => {
        setBlogs(blogs.map(blog =>
            blog.id === blogId
                ? {
                    ...blog,
                    status: blog.status === 'published' ? 'draft' : 'published',
                    updatedAt: new Date().toISOString()
                }
                : blog
        ));

        const blog = blogs.find(blog => blog.id === blogId);
        const newStatus = blog.status === 'published' ? 'draft' : 'published';

        setSnackbar({
            open: true,
            message: `Blog post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
            severity: 'success'
        });
    }

    const onEdit = (id) => {
        navigate(`/admin/blogs/edit/${id}`)
    }

    const handleGoBack = () => {
        navigate('/admin/blogs');
    };

    const handleEdit = () => {
        onEdit(blog.id);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(blog.id);
        setDeleteDialogOpen(false);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleTogglePublish = () => {
        onTogglePublish(blog.id);
    };

    const handleDeleteBlog = (blogId) => {
        setBlogs(mockBlogs.filter(blog => blog.id !== blogId));

        setSnackbar({
            open: true,
            message: 'Blog post deleted successfully',
            severity: 'success'
        });

        navigate('/admin/blogs');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!blog) {
        return (
            <Box mt={4}>
                <Alert severity="error">Blog post not found</Alert>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{ mt: 2 }}
                >
                    Go Back to Blog List
                </Button>
            </Box>
        );
    }

    return (
        <AdminLayout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                    <IconButton onClick={handleGoBack} sx={{ mr: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1" flex="1">
                        Blog Details
                    </Typography>
                    <Box display="flex" gap={1}>
                        <Button
                            variant="outlined"
                            color={blog.status === 'published' ? 'warning' : 'success'}
                            startIcon={blog.status === 'published' ? <PublicOffIcon /> : <PublicIcon />}
                            onClick={handleTogglePublish}
                        >
                            {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    {/* Blog metadata */}
                    <Grid item xs={12} md={4}>
                        <Card elevation={3}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={blog.coverImage || '/placeholder-blog.jpg'}
                                alt={blog.title}
                            />
                            <CardContent>
                                <Box mt={1} mb={3} display="flex" justifyContent="center">
                                    {getBlogStatusChip(blog.status)}
                                </Box>

                                <Typography variant="h6" gutterBottom>
                                    Blog Information
                                </Typography>
                                <Divider sx={{ mb: 2 }} />

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <PersonIcon color="primary" />
                                            <Typography variant="subtitle2">Author:</Typography>
                                            <Typography variant="body2">{blog.author}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <CategoryIcon color="primary" />
                                            <Typography variant="subtitle2">Category:</Typography>
                                            <Chip
                                                label={blog.category}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <TodayIcon color="primary" />
                                            <Typography variant="subtitle2">Created:</Typography>
                                            <Typography variant="body2">{formatDate(blog.createdAt)}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <CalendarIcon color="primary" />
                                            <Typography variant="subtitle2">Last Updated:</Typography>
                                            <Typography variant="body2">{formatDate(blog.updatedAt)}</Typography>
                                        </Box>
                                    </Grid>

                                    {blog.tags && blog.tags.length > 0 && (
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" gutterBottom>Tags:</Typography>
                                            <Box display="flex" flexWrap="wrap" gap={1}>
                                                {blog.tags.map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Blog content */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                {blog.title}
                            </Typography>

                            {blog.excerpt && (
                                <>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontStyle: 'italic',
                                            color: 'text.secondary',
                                            mb: 2
                                        }}
                                    >
                                        {blog.excerpt}
                                    </Typography>
                                    <Divider sx={{ mb: 3 }} />
                                </>
                            )}

                            <Box sx={{ mt: 2 }}>
                                {/* Using dangerouslySetInnerHTML to render HTML content from the editor */}
                                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>



            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                itemType="blog post"
                itemName={blog?.title}
            />
        </AdminLayout>
    );
};

export default BlogDetails;