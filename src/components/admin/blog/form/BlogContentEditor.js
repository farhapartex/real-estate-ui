// File: components/blog/form/BlogContentEditor.jsx
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Paper,
    Divider,
    FormHelperText
} from '@mui/material';
import ReactDOM from "react-dom";

// Import Rich Text Editor
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Rich text editor modules and formats
const EDITOR_MODULES = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ],
};

const EDITOR_FORMATS = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
];

/**
 * Blog content editor component with title, excerpt and rich text editor
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Blog title
 * @param {string} props.excerpt - Blog excerpt
 * @param {string} props.content - Blog content
 * @param {Function} props.onTitleChange - Handler for title changes
 * @param {Function} props.onExcerptChange - Handler for excerpt changes
 * @param {Function} props.onContentChange - Handler for content changes
 * @param {Object} props.errors - Form validation errors
 */
const BlogContentEditor = ({
    title,
    excerpt,
    content,
    onTitleChange,
    onExcerptChange,
    onContentChange,
    errors
}) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'title') {
            onTitleChange(value);
        } else if (name === 'excerpt') {
            onExcerptChange(value);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Blog Content
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <TextField
                fullWidth
                label="Title"
                name="title"
                value={title}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                error={Boolean(errors?.title)}
                helperText={errors?.title}
                required
            />

            {/* <TextField
                fullWidth
                label="Excerpt / Summary"
                name="excerpt"
                value={excerpt}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
                placeholder="Brief summary of the blog post (optional)"
            /> */}

            <Box mt={3} mb={1}>
                <Typography variant="body1" gutterBottom>
                    Content*
                </Typography>
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={onContentChange}
                    modules={EDITOR_MODULES}
                    formats={EDITOR_FORMATS}
                    style={{ height: '550px', marginBottom: '50px' }}
                />
                {errors?.content && (
                    <FormHelperText error>{errors.content}</FormHelperText>
                )}
            </Box>
        </Paper>
    );
};

export default BlogContentEditor;