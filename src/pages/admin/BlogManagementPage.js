// File: BlogManagement.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Container,
    Typography,
    Button,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Add as AddIcon
} from '@mui/icons-material';

// Import components
import BlogList from '../../components/admin/blog/BlogList';
import BlogCreate from './BlogCreate';
import BlogEdit from './BlogEdit'
import AdminLayout from '../../layouts/AdminLayout';

// Import mock data
import { mockBlogs } from '../../mockBlogs';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setBlogs(mockBlogs);
            setLoading(false);
        }, 1000);
    }, []);

    const handleCreateBlog = (newBlog) => {
        const blogToAdd = {
            ...newBlog,
            id: blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) + 1 : 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setBlogs([blogToAdd, ...blogs]);

        setSnackbar({
            open: true,
            message: 'Blog post created successfully',
            severity: 'success'
        });

        navigate('/admin/blogs');
    };

    const handleUpdateBlog = (updatedBlog) => {
        setBlogs(blogs.map(blog =>
            blog.id === updatedBlog.id
                ? { ...updatedBlog, updatedAt: new Date().toISOString() }
                : blog
        ));

        setSnackbar({
            open: true,
            message: 'Blog post updated successfully',
            severity: 'success'
        });

        navigate('/admin/blogs');
    };

    const handleDeleteBlog = (blogId) => {
        setBlogs(blogs.filter(blog => blog.id !== blogId));

        setSnackbar({
            open: true,
            message: 'Blog post deleted successfully',
            severity: 'success'
        });

        navigate('/admin/blogs');
    };

    const handleTogglePublish = (blogId) => {
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
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <AdminLayout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Blog Management
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/admin/blogs/new')}
                    >
                        Create New Blog Post
                    </Button>
                </Box>
                <BlogList
                    blogs={blogs}
                    loading={loading}
                    onTogglePublish={handleTogglePublish}
                    onDelete={handleDeleteBlog}
                />
                {/* <Routes>
                <Route path="/" element={
                    <>
                            
                    } />
                        <Route path="/create" element={
                        <BlogCreate onSubmit={handleCreateBlog} />
                    } />
                    <Route path="/edit/:id" element={
                        <BlogEdit blogs={blogs} onSubmit={handleUpdateBlog} />
                    } />
                    </Routes> */}

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </AdminLayout >
    );
};

export default BlogManagement;