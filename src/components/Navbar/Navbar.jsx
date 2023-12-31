'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone';
import { Mail, Notifications, PersonAdd } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Auth from '../Auth/Auth';
import Drawerbar from '../Drawer/Drawerbar';
import SearchBar from '../SearchBar/SearchBar';
import loggedIn from '@/utils/loggedin';
import { useSession } from 'next-auth/react';

const styleToolbar = {
    width: '100dvw',
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
};

const styleBox = {
    flex: '1 1 100%',
    backgroundColor: 'transparent',
    padding: '0',
    display: {xs: 'none', sm: 'flex'},
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
};

const Navbar = () => {
    const [anchor, setAnchor] = useState(null)
    const open = Boolean(anchor)
    const [openDrawer, setOpenDrawer] = useState(false)
    const { data } = useSession();

    const handleClose = () => {
        setAnchor(null)
    }

    const dropdownMenu = [
        [ 'Profile', <Avatar alt={data?.user.name} src={data?.user.image} /> ],
        [ 'Add another account', <ListItemIcon><PersonAdd/></ListItemIcon> ],
        [ '', <Auth /> ]
    ]

    // Close the drawer if viewport's width goes beyond 600px breakpoint 
    useEffect(() => {
        const setWidth = () => {
            const currentWidth = window.innerWidth;
            if (currentWidth > 600) {
                setOpenDrawer(false)
            }
        }
        window.addEventListener('resize', setWidth)
        setWidth();

        // Cleanup: Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', setWidth);
        };
    }, [])


    return (
        <>
        <AppBar>
            <Toolbar sx={styleToolbar}>

                {/* Logo and drawer button */}
                <Box sx={{flex: '1 1 100%'}}>
                    <Link href={'/'}>
                        <Typography 
                            sx={{display: {xs: 'none', sm: 'initial'}}}
                            variant='h6'
                            component='h1'
                            >Treads
                        </Typography>
                    </Link>
                    <IconButton onClick={() => setOpenDrawer((prev) => !prev)}>
                        <LunchDiningTwoToneIcon color='inherit' size='large' sx={{display: {xs: 'block', sm:'none'}}}/>
                    </IconButton>
                </Box>

                {/* Searchbar */}
                <Box sx={{flex: '1 1 100%', minWidth: {xs: '300px', sm: '450px'}}}>
                    <SearchBar />
                </Box>

                <Box sx={styleBox}>
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
                </Box>
            </Toolbar>
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
                {(loggedIn() ? dropdownMenu : dropdownMenu.slice(-1)).map((menu, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                        {menu[1]}
                        {menu[0]}
                    </MenuItem>
                ))}
            </Menu>
        </AppBar>
        {/* Drawerbar menu */}
        <Drawerbar open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    );
}

export default Navbar;
