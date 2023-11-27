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
    PersonAdd, 
    PushPin, 
    Settings, 
    SubjectOutlined } from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import Auth from '../Auth/Auth';
import Avatar from '@mui/material/Avatar';
import loggedIn from '@/utils/loggedin';

const Drawerbar = ({open, setOpen}) => {
    const { mode, toggle } = useContext(ModeContext)
    const { data } = useSession()
    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={() => setOpen(false)}>
            <Box
                sx={{ width: '250px' }}
                onKeyDown={() => setOpen(false)}>
                { loggedIn() ? 
                <nav aria-label='drawerbar navigation'>
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
                                    <Avatar sx={{width: '26px', height: '26px'}} alt={data?.user.name} src={data?.user.image} /> 
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonAdd />
                                </ListItemIcon>
                                <ListItemText primary="Add another account" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={signOut}>
                            <ListItemButton>
                                <Auth />
                            </ListItemButton>
                        </ListItem>
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
                            <ListItemButton>
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
                                <Auth />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ModeNight />
                                </ListItemIcon>
                                <Switch onChange={toggle} checked={mode === 'dark'}/>
                            </ListItemButton>
                        </ListItem>
                    </List> 
                </nav>}
            </Box>
        </Drawer>
    );
}

export default Drawerbar;