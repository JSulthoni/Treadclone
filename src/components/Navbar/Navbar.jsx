'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Divider, ListItemIcon, styled } from '@mui/material';
import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone';
import { Mail, Notifications, PersonAdd, Settings } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Auth from '../Auth/Auth';
import Drawerbar from '../Drawer/Drawerbar';
import { useSession } from 'next-auth/react';

const StyledToolbar = styled(Toolbar)({
    width: '100dvw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
});

const StyledBox1 = styled(Box)({
    justifySelf: 'center',
    backgroundColor: 'white',
    padding: '0 20px',
    backgroundColor: 'pink',
    marginInline: 'auto',
    width: '30%',
    minWidth: '200px'
});

const StyledBox2 = styled(Box)({
    flex: '1',
    backgroundColor: 'transparent',
    padding: '0',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    maxWidth: '30%'
});


const Navbar = () => {
    const [anchor, setAnchor] = useState(null)
    const open = Boolean(anchor)
    const [openDrawer, setOpenDrawer] = useState(false)

    const { data, status } = useSession();

    const handleClose = () => {
        setAnchor(null)
    }

    return (
        <>
        <AppBar>
            <StyledToolbar>
                <Box width={{sm: '30%'}}>
                    <Link href={'/'}>
                        <Typography 
                            sx={{display: {xs: 'none', sm: 'initial'}}}
                            variant='h6'
                            component='h1'
                            >Treads
                        </Typography>
                    </Link>
                    <IconButton onClick={() => setOpenDrawer((prev) => !prev)}>
                        <LunchDiningTwoToneIcon size='large' sx={{display: {xs: 'block', sm:'none'}}}/>
                    </IconButton>
                </Box>
                    <StyledBox1>
                        <InputBase placeholder='look for treads...'/>
                    </StyledBox1>
                <StyledBox2>
                    <IconButton>
                        <Badge badgeContent={4} color='error'>
                            <Mail />
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <Badge badgeContent={10} color='error'>
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={(event) => setAnchor(event.currentTarget)}>
                        <Avatar src={data?.user.image} />
                    </IconButton>
                </StyledBox2>
            </StyledToolbar>
            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx= {{
                    overflow: 'visible',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem onClick={handleClose}>
                    <Avatar src='https://placehold.co/400' /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                        <Auth/>
                </MenuItem>
            </Menu>
        </AppBar>
        {/* Drawerbar menu */}
        <Drawerbar open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    );
}

export default Navbar;
