// File: components/blog/form/TagInput.jsx
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Chip,
    IconButton
} from '@mui/material';
import {
    Add as AddIcon
} from '@mui/icons-material';

/**
 * Component for adding and displaying tags
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tags - Array of tags
 * @param {string} props.inputValue - Current input value
 * @param {Function} props.onInputChange - Handler for input changes
 * @param {Function} props.onAddTag - Handler for adding tags
 * @param {Function} props.onRemoveTag - Handler for removing tags
 */
const TagInput = ({
    tags,
    inputValue,
    onInputChange,
    onAddTag,
    onRemoveTag
}) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAddTag();
        }
    };

    return (
        <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
                Tags
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Add a tag..."
                    value={inputValue}
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    sx={{ mr: 1 }}
                />
                <IconButton
                    color="primary"
                    onClick={onAddTag}
                    disabled={!inputValue.trim()}
                >
                    <AddIcon />
                </IconButton>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={1}>
                {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        onDelete={() => onRemoveTag(tag)}
                        size="small"
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TagInput;