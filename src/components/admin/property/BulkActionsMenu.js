import React, { useState } from 'react';
import {
    Paper,
    Box,
    Typography,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    Flag as FlagIcon,
    FlagOutlined as FlagOutlinedIcon,
    ToggleOn as ToggleOnIcon,
    ToggleOff as ToggleOffIcon,
    Delete as DeleteIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';

const BulkActionsMenu = ({ selectedCount, onAction }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (action) => {
        onAction(action);
        handleClose();
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8f9fa'
            }}
        >
            <Typography variant="subtitle1">
                <strong>{selectedCount}</strong> properties selected
            </Typography>

            <Button
                variant="contained"
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Bulk Actions
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => handleAction('approve')}>
                    <ListItemIcon>
                        <CheckCircleIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText>Approve Properties</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleAction('feature')}>
                    <ListItemIcon>
                        <StarIcon fontSize="small" color="warning" />
                    </ListItemIcon>
                    <ListItemText>Feature Properties</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleAction('unfeature')}>
                    <ListItemIcon>
                        <StarBorderIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Unfeature Properties</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => handleAction('flag')}>
                    <ListItemIcon>
                        <FlagIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>Flag Properties</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleAction('unflag')}>
                    <ListItemIcon>
                        <FlagOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove Flags</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => handleAction('activate')}>
                    <ListItemIcon>
                        <ToggleOnIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText>Activate Properties</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleAction('deactivate')}>
                    <ListItemIcon>
                        <ToggleOffIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Deactivate Properties</ListItemText>
                </MenuItem>
            </Menu>
        </Paper>
    );
};

export default BulkActionsMenu;