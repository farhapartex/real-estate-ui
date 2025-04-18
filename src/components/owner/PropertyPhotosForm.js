import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    IconButton,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Snackbar,
    Alert
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const PropertyPhotosForm = ({
    propertyImages,
    handleImageUpload,
    handleRemoveImage,
    isEditMode
}) => {
    const [images, setImages] = useState([
        // Sample data - replace with your actual image data
        { id: 1, url: 'https://images.unsplash.com/photo-1675279200694-8529c73b1fd0?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Front View' },
        { id: 2, url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Living Room' },
        { id: 3, url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Kitchen' },
    ]);

    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleOpenUploadModal = () => setOpenUploadModal(true);
    const handleCloseUploadModal = () => {
        setOpenUploadModal(false);
        setUploadedFiles([]);
    };

    const handleFileSelect = (e) => {
        e.preventDefault();
        const files = e.target.files;
        handleFiles(files);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const removeFile = (index) => {
        setUploadedFiles(prevFiles => {
            const newFiles = [...prevFiles];
            URL.revokeObjectURL(newFiles[index].preview);
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleFiles = (files) => {
        const newFiles = Array.from(files).map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name
        }));

        setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const deleteImage = (id) => {
        // In a real application, you would call an API to delete the image
        setImages(images.filter(image => image.id !== id));
        setSnackbar({
            open: true,
            message: 'Image deleted successfully!',
            severity: 'success'
        });
    };

    const handleUpload = () => {
        if (uploadedFiles.length === 0) {
            setSnackbar({
                open: true,
                message: 'Please select files to upload',
                severity: 'error'
            });
            return;
        }

        // In a real application, you would use FormData to send files to your API
        // const formData = new FormData();
        // uploadedFiles.forEach(fileObj => {
        //   formData.append('images', fileObj.file);
        // });
        // axios.post('/api/properties/images/upload', formData)...

        // Mock successful upload
        const newImages = uploadedFiles.map((fileObj, index) => ({
            id: images.length + index + 1,
            url: fileObj.preview,
            title: `New Image ${images.length + index + 1}`
        }));

        setImages(prevImages => [...prevImages, ...newImages]);
        handleCloseUploadModal();
        setSnackbar({
            open: true,
            message: `${uploadedFiles.length} images uploaded successfully!`,
            severity: 'success'
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header with upload button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" component="h2">
                    Property Images
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleOpenUploadModal}
                >
                    Upload Images
                </Button>
            </Box>

            {/* Image Gallery */}
            {images.length > 0 ? (
                <Grid container spacing={2}>
                    {images.map((image) => (
                        <Grid item xs={12} sm={6} md={4} key={image.id}>
                            <Card sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={image.url}
                                    alt={image.title}
                                />
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bgcolor: 'rgba(0,0,0,0.5)',
                                    borderRadius: '0 0 0 8px'
                                }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => deleteImage(image.id)}
                                        sx={{ color: 'white' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ p: 1 }}>
                                    <Typography variant="body2">{image.title}</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{
                    p: 4,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 1
                }}>
                    <Typography variant="body1" color="text.secondary">
                        No images have been uploaded for this property.
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        sx={{ mt: 2 }}
                        onClick={handleOpenUploadModal}
                    >
                        Upload Your First Image
                    </Button>
                </Box>
            )}

            {/* Upload Modal */}
            <Dialog
                open={openUploadModal}
                onClose={handleCloseUploadModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    Upload Property Images
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseUploadModal}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {/* Drag & Drop Area */}
                    <Box
                        sx={{
                            border: dragActive ? '2px dashed #1976d2' : '2px dashed #ccc',
                            borderRadius: 2,
                            p: 3,
                            textAlign: 'center',
                            bgcolor: dragActive ? 'rgba(25, 118, 210, 0.04)' : 'background.paper',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            mb: 3
                        }}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload').click()}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                        <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Drag and drop your images here
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            or click to browse your files
                        </Typography>
                    </Box>

                    {/* Preview of selected files */}
                    {uploadedFiles.length > 0 && (
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Selected Files ({uploadedFiles.length})
                            </Typography>
                            <Grid container spacing={2}>
                                {uploadedFiles.map((fileObj, index) => (
                                    <Grid item xs={6} sm={4} md={3} key={index}>
                                        <Card sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={fileObj.preview}
                                                alt={fileObj.name}
                                            />
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                bgcolor: 'rgba(0,0,0,0.5)',
                                                borderRadius: '0 0 0 8px'
                                            }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => removeFile(index)}
                                                    sx={{ color: 'white' }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ p: 1 }}>
                                                <Typography noWrap variant="caption">{fileObj.name}</Typography>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUploadModal}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        disabled={uploadedFiles.length === 0}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>

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
        </Box>
    );
};

export default PropertyPhotosForm;