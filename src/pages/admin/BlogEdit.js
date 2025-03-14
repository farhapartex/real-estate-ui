// File: components/blog/BlogCreate.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    Box,
    Grid,
    Container
} from '@mui/material';

// Import sub-components
import BlogHeader from '../../components/admin/blog/form/BlogHeader';
import BlogContentEditor from '../../components/admin/blog/form/BlogContentEditor';
import BlogMetadata from '../../components/admin/blog/form/BlogMetadata';
import BlogCoverImage from '../../components/admin/blog/form/BlogCoverImage';

// Import utilities
import { validateBlogForm } from '../../components/utils/blog/blogUtils';
import AdminLayout from '../../layouts/AdminLayout';
import { mockBlogs } from '../../mockBlogs';

const BlogEditPage = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        category: '',
        tags: [],
        status: 'draft',
        coverImage: null
    });
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [originalBlog, setOriginalBlog] = useState(null);

    const [errors, setErrors] = useState({});
    const [tagInput, setTagInput] = useState('');
    const [coverImagePreview, setCoverImagePreview] = useState(null);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setBlogs(mockBlogs);
            setLoading(false);
        }, 1000);
    }, []);

    const handleGoBack = () => {
        navigate('/admin/blogs');
    };

    // Title change handler
    const handleTitleChange = (value) => {
        setFormData({
            ...formData,
            title: value
        });

        if (errors.title) {
            setErrors({
                ...errors,
                title: null
            });
        }
    };

    // Excerpt change handler
    const handleExcerptChange = (value) => {
        setFormData({
            ...formData,
            excerpt: value
        });
    };

    // Content change handler
    const handleContentChange = (content) => {
        setFormData({
            ...formData,
            content
        });

        if (errors.content) {
            setErrors({
                ...errors,
                content: null
            });
        }
    };

    // Author change handler
    const handleAuthorChange = (value) => {
        setFormData({
            ...formData,
            author: value
        });

        if (errors.author) {
            setErrors({
                ...errors,
                author: null
            });
        }
    };

    // Category change handler
    const handleCategoryChange = (value) => {
        setFormData({
            ...formData,
            category: value
        });

        if (errors.category) {
            setErrors({
                ...errors,
                category: null
            });
        }
    };

    // Tag input change handler
    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    // Add tag handler
    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            });
            setTagInput('');
        }
    };

    // Remove tag handler
    const handleRemoveTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    // Cover image click handler
    const handleCoverImageClick = () => {
        fileInputRef.current.click();
    };

    // Cover image change handler
    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                setErrors({
                    ...errors,
                    coverImage: 'Please upload an image file (jpg, png, etc.)'
                });
                return;
            }

            // For demo purposes, create an object URL
            const imageUrl = URL.createObjectURL(file);
            setCoverImagePreview(imageUrl);

            setFormData({
                ...formData,
                coverImage: imageUrl
            });

            // Clear error when image is uploaded
            if (errors.coverImage) {
                setErrors({
                    ...errors,
                    coverImage: null
                });
            }
        }
    };

    // Remove cover image handler
    const handleRemoveCoverImage = () => {
        setFormData({
            ...formData,
            coverImage: null
        });
        setCoverImagePreview(null);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle saving as draft
    const handleSaveDraft = (e) => {
        e.preventDefault();
        handleSubmit(e, true);
    };

    // Handle publishing
    const handlePublish = (e) => {
        e.preventDefault();
        handleSubmit(e, false);
    };

    // Form submission handler
    const handleSubmit = (event, saveAsDraft = false) => {
        event.preventDefault();

        // Set status based on save action
        const blogData = {
            ...formData,
            status: saveAsDraft ? 'draft' : 'published'
        };

        // Validate form
        const formErrors = validateBlogForm(formData);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Submit form data
        //onSubmit(blogData);
    };


    // Load blog data
    useEffect(() => {
        setLoading(true);

        // Find the blog by ID
        const blogId = parseInt(id);
        const blog = blogs.find(blog => blog.id === blogId);

        if (blog) {
            setOriginalBlog(blog);
            setFormData({
                ...blog,
                // Ensure tags is an array
                tags: blog.tags || []
            });

            if (blog.coverImage) {
                setCoverImagePreview(blog.coverImage);
            }
        }

        setLoading(false);
    }, [id, blogs]);

    return (
        <AdminLayout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <BlogHeader
                    title="Edit Blog Post"
                    onBack={handleGoBack}
                    onSaveDraft={handleSaveDraft}
                    onPublish={handlePublish}
                    isEdit={false}
                />

                <Grid container spacing={3}>
                    {/* Main content editor */}
                    <Grid item xs={12} md={8}>
                        <BlogContentEditor
                            title={formData.title}
                            excerpt={formData.excerpt}
                            content={formData.content}
                            onTitleChange={handleTitleChange}
                            onExcerptChange={handleExcerptChange}
                            onContentChange={handleContentChange}
                            errors={errors}
                        />
                    </Grid>

                    {/* Sidebar options */}
                    <Grid item xs={12} md={4}>
                        <BlogMetadata
                            author={formData.author}
                            category={formData.category}
                            tags={formData.tags}
                            tagInput={tagInput}
                            onAuthorChange={handleAuthorChange}
                            onCategoryChange={handleCategoryChange}
                            onTagInputChange={handleTagInputChange}
                            onAddTag={handleAddTag}
                            onRemoveTag={handleRemoveTag}
                            errors={errors}
                        />

                        <BlogCoverImage
                            fileInputRef={fileInputRef}
                            previewUrl={coverImagePreview}
                            onImageClick={handleCoverImageClick}
                            onImageChange={handleCoverImageChange}
                            onRemoveImage={handleRemoveCoverImage}
                            error={errors.coverImage}
                        />
                    </Grid>
                </Grid>
            </Container>
        </AdminLayout>
    );
};

export default BlogEditPage;