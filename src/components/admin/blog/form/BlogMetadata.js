// File: components/blog/form/BlogMetadata.jsx
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Divider,
    FormHelperText
} from '@mui/material';

// Import the TagInput component
import TagInput from './TagInput';

// Blog categories for demo purposes
const BLOG_CATEGORIES = [
    'Real Estate',
    'Home Improvement',
    'Interior Design',
    'Property Investment',
    'Market Trends',
    'Home Buying Tips',
    'Selling Tips',
    'Rental Market',
    'Mortgage & Finance',
    'Legal & Taxes'
];

/**
 * Component for blog metadata (author, category, tags)
 * 
 * @param {Object} props - Component props
 * @param {string} props.author - Blog author
 * @param {string} props.category - Blog category
 * @param {Array} props.tags - Blog tags
 * @param {string} props.tagInput - Current tag input value
 * @param {Function} props.onAuthorChange - Handler for author changes
 * @param {Function} props.onCategoryChange - Handler for category changes
 * @param {Function} props.onTagInputChange - Handler for tag input changes
 * @param {Function} props.onAddTag - Handler for adding tag
 * @param {Function} props.onRemoveTag - Handler for removing tag
 * @param {Object} props.errors - Form validation errors
 */
const BlogMetadata = ({
    author,
    category,
    tags,
    tagInput,
    onAuthorChange,
    onCategoryChange,
    onTagInputChange,
    onAddTag,
    onRemoveTag,
    errors
}) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'author') {
            onAuthorChange(value);
        } else if (name === 'category') {
            onCategoryChange(value);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Blog Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <TextField
                fullWidth
                label="Author"
                name="author"
                value={author}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                error={Boolean(errors?.author)}
                helperText={errors?.author}
                required
            />

            <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={Boolean(errors?.category)}
                required
            >
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={category}
                    onChange={handleInputChange}
                    label="Category"
                >
                    {BLOG_CATEGORIES.map((cat, index) => (
                        <MenuItem key={index} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
                {errors?.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                )}
            </FormControl>

            <TagInput
                tags={tags}
                inputValue={tagInput}
                onInputChange={onTagInputChange}
                onAddTag={onAddTag}
                onRemoveTag={onRemoveTag}
            />
        </Paper>
    );
};

export default BlogMetadata;