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

const Sidebar = () => {
    const { mode, toggle } = useContext(ModeContext);

    function handleSidebar(side) {
        switch (side) {
            case 'Home' :
                router.push('/');
                break;
            case 'Treads' :
                router.push('/treads');
                break;
            case 'Auth' :
                signOut();
                break;
            default:
                break;
        }
    }

    const sidebarComponent = [
        ['Home', <Home/>],
        ['Treads', <SubjectOutlined/>],
        ['Direct Messages', <Inbox/>],
        ['Pinned', <PushPin/>],
        ['Drafts', <Article/>],
        ['Apps', <Apps/>],
        ['Settings', <Settings/>],
        [ <Switch sx={{marginLeft: '-12px'}} onChange={toggle} checked={mode === 'dark'}/>, <ModeNight/>],
    ]

    return (
        <Box sx={{flex:'1 1 20%', display: {xs: 'none', sm: 'block'}}}>
            <Box position='fixed' sx={styleBox}>
                <Paper>
                    { loggedIn() ? 
                    <nav>
                        <List>
                        {sidebarComponent.map((side, index) => (
                            <React.Fragment key={index}>
                            <ListItem disablePadding onClick={() => handleSidebar(side[0])}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {side[1]}
                                    </ListItemIcon>
                                    <ListItemText primary={side[0]} />
                                </ListItemButton>
                            </ListItem>
                            {index === 1 || index === 5 ? <Divider sx={{marginBlock: '10px'}} /> : null}
                            </React.Fragment>
                        ))}
                        </List>
                    </nav>
                    :
                    <nav>
                        <List>
                            {sidebarComponent.slice(-2).map((side, index) => (
                                <React.Fragment key={index}>
                                <ListItem disablePadding onClick={() => handleSidebar(side[0])}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {side[1]}
                                        </ListItemIcon>
                                        <ListItemText primary={side[0]} />
                                    </ListItemButton>
                                </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    </nav>}
                </Paper>
            </Box>
        </Box>
    );
}

export default Sidebar;
