// File: components/blog/BlogList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Tooltip,
    Chip,
    Box,
    Typography,
    CircularProgress,
    Stack,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Public as PublicIcon,
    PublicOff as PublicOffIcon,
    MoreVert as MoreVertIcon,
    Search as SearchIcon,
    Person as PersonIcon,
    Category as CategoryIcon,
    Today as TodayIcon
} from '@mui/icons-material';

// Import utilities
import { formatDate, truncateText, getBlogStatusChip } from '../../utils/blog/blogUtils';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const BlogList = ({ blogs, loading, onTogglePublish, onDelete }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuBlogId, setMenuBlogId] = useState(null);

    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuOpen = (event, blogId) => {
        setAnchorEl(event.currentTarget);
        setMenuBlogId(blogId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuBlogId(null);
    };

    const handleViewBlog = (blogId) => {
        navigate(`/admin/blogs/view/${blogId}`);
        handleMenuClose();
    };

    const handleEditBlog = (blogId) => {
        navigate(`/admin/blogs/edit/${blogId}`);
        handleMenuClose();
    };

    const handleDeleteClick = (blog) => {
        setSelectedBlog(blog);
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        onDelete(selectedBlog.id);
        setDeleteDialogOpen(false);
        setSelectedBlog(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedBlog(null);
    };

    const handleTogglePublish = (blogId) => {
        onTogglePublish(blogId);
        handleMenuClose();
    };

    // Filter blogs based on search term
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Box mb={3}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by title, author, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Paper elevation={3}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow style={{ height: 53 * 5 }}>
                                    <TableCell colSpan={7} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredBlogs.length === 0 ? (
                                <TableRow style={{ height: 53 }}>
                                    <TableCell colSpan={7} align="center">
                                        <Typography variant="body1" color="textSecondary">
                                            No blog posts found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBlogs
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((blog) => (
                                        <TableRow hover key={blog.id}>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: 2
                                                    }}
                                                >
                                                    {blog.coverImage && (
                                                        <Box
                                                            component="img"
                                                            src={blog.coverImage}
                                                            alt={blog.title}
                                                            sx={{
                                                                width: 60,
                                                                height: 40,
                                                                objectFit: 'cover',
                                                                borderRadius: 1
                                                            }}
                                                        />
                                                    )}
                                                    <Box>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                    textDecoration: 'underline'
                                                                }
                                                            }}
                                                            onClick={() => handleViewBlog(blog.id)}
                                                        >
                                                            {blog.title}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            sx={{ mt: 0.5 }}
                                                        >
                                                            {truncateText(blog.excerpt || blog.content, 100)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <PersonIcon fontSize="small" color="action" />
                                                    <Typography variant="body2">{blog.author}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={blog.category}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                    icon={<CategoryIcon fontSize="small" />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {getBlogStatusChip(blog.status)}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <TodayIcon fontSize="small" color="action" />
                                                    <Typography variant="body2">{formatDate(blog.createdAt)}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <TodayIcon fontSize="small" color="action" />
                                                    <Typography variant="body2">{formatDate(blog.updatedAt)}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="more actions"
                                                    size="small"
                                                    onClick={(event) => handleMenuOpen(event, blog.id)}
                                                >
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredBlogs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => handleViewBlog(menuBlogId)}>
                    <ListItemIcon>
                        <VisibilityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleEditBlog(menuBlogId)}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>

                {menuBlogId && blogs.find(b => b.id === menuBlogId)?.status === 'published' ? (
                    <MenuItem onClick={() => handleTogglePublish(menuBlogId)}>
                        <ListItemIcon>
                            <PublicOffIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Unpublish</ListItemText>
                    </MenuItem>
                ) : (
                    <MenuItem onClick={() => handleTogglePublish(menuBlogId)}>
                        <ListItemIcon>
                            <PublicIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Publish</ListItemText>
                    </MenuItem>
                )}

                <Divider />

                <MenuItem
                    onClick={() => handleDeleteClick(blogs.find(b => b.id === menuBlogId))}
                    sx={{ color: 'error.main' }}
                >
                    <ListItemIcon sx={{ color: 'error.main' }}>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            {selectedBlog && (
                <DeleteConfirmDialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    itemType="blog post"
                    itemName={selectedBlog.title}
                />
            )}
        </>
    );
};

export default BlogList;