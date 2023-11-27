'use client'

import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { 
    Apps,
    Article,
    Home, 
    Inbox, 
    ModeNight, 
    PushPin, 
    Settings, 
    SubjectOutlined } from '@mui/icons-material';
import { ModeContext } from '@/context/ModeContext';
import loggedIn from '@/utils/loggedin';

const styleBox = {
    width: {md: '30%', lg: '20%'}
};

const bar = {
    'Home' : <Home/>
}

const Sidebar = () => {
    const { mode, toggle } = useContext(ModeContext);

    return (
        <Box sx={{flex:'1 1 20%', display: {xs: 'none', sm: 'block'}}}>
            <Box position='fixed' sx={styleBox}>
                <Paper>
                    { loggedIn() ? 
                    <nav>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component='a' href='/'>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component='a' href='/treads'>
                                    <ListItemIcon>
                                        <SubjectOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary="Treads" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    <Divider />
                        <List>
                            {['Direct Messages', 'Pinned', 'Drafts', 'Apps'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    {index === 0 ? <Inbox /> : index === 1 ? <PushPin /> : index === 2 ? <Article /> : <Apps />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                            ))}
                        </List>
                    <Divider />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <ModeNight />
                                    </ListItemIcon>
                                    <Switch onChange={toggle} checked={mode === 'dark'}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    :
                    <nav>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <ModeNight />
                                    </ListItemIcon>
                                    <Switch onChange={toggle} checked={mode === 'dark'}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>}
                </Paper>
            </Box>
        </Box>
    );
}

export default Sidebar;
