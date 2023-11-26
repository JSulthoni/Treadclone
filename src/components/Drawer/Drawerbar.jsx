import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { ModeContext } from '@/context/ModeContext';
import { useContext } from 'react';
import { 
    Apps, 
    Article, 
    Home, 
    Inbox, 
    Login, 
    ModeNight, 
    PushPin, 
    Settings, 
    SubjectOutlined } from '@mui/icons-material';
import { signOut } from 'next-auth/react';

const Drawerbar = ({open, setOpen}) => {
    const { mode, toggle } = useContext(ModeContext)

    return (
        <>
        <Drawer
            anchor='left'
            open={open}
            onClose={() => setOpen(false)}>
            <Box
                sx={{ width: '150px' }}
                onKeyDown={() => setOpen(false)}>
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
                    { status === 'authenticated' && 
                    <ListItem disablePadding>
                        <ListItemButton onClick={signOut}>
                            <ListItemIcon>
                                <Login />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>}
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ModeNight />
                            </ListItemIcon>
                            <Switch onChange={toggle} checked={mode === 'dark'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
        </>
    );
}

export default Drawerbar;