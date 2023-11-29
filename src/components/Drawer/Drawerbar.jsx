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
import React, { useContext } from 'react';
import { 
    Apps, 
    Article, 
    Home, 
    Inbox, 
    ModeNight, 
    PersonAdd, 
    PushPin, 
    Settings, 
    SubjectOutlined } from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import Auth from '../Auth/Auth';
import Avatar from '@mui/material/Avatar';
import loggedIn from '@/utils/loggedin';
import { useRouter } from 'next/navigation';
import Footer from '../Footer/Footer';






const Drawerbar = ({open, setOpen}) => {
    const { mode, toggle } = useContext(ModeContext)
    const { data } = useSession()
    const router = useRouter();

    function handleDrawer(draw) {
        switch (draw) {
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

    const drawerComponent = [
        ['Home', <Home/>],
        ['Treads', <SubjectOutlined/>],
        ['Direct Messages', <Inbox/>],
        ['Pinned', <PushPin/>],
        ['Drafts', <Article/>],
        ['Apps', <Apps/>],
        ['Profile', <Avatar sx={{width: '26px', height: '26px'}} alt={data?.user.name} src={data?.user.image}/>],
        ['Add another account', <PersonAdd/>],
        ['', <Auth/>],
        ['Settings', <Settings/>],
        [ <Switch sx={{marginLeft: '-12px'}} onChange={toggle} checked={mode === 'dark'}/>, <ModeNight/>],
    ]

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
                    {drawerComponent.map((draw, index) => (
                            <React.Fragment key={index}>
                            <ListItem disablePadding onClick={() => handleDrawer(draw[0])}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {draw[1]}
                                    </ListItemIcon>
                                    <ListItemText primary={draw[0]} />
                                </ListItemButton>
                            </ListItem>
                            {index === 1 || index === 5 || index === 8 ? <Divider sx={{marginBlock: '10px'}} /> : null}
                            </React.Fragment>
                    ))}
                    </List> 
                </nav>
                : 
                <nav>
                    <List>
                    {drawerComponent.slice(-3).map((draw, index) => (
                            <React.Fragment key={index}>
                            <ListItem disablePadding onClick={() => handleDrawer(draw[0])}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {draw[1]}
                                    </ListItemIcon>
                                    <ListItemText primary={draw[0]} />
                                </ListItemButton>
                            </ListItem>
                            {index < 2 ? <Divider sx={{marginBlock: '10px'}}/> : null}
                            </React.Fragment>
                    ))}
                    </List> 
                </nav>}
                <Box sx={{position: 'absolute', bottom: '0', width: '100%'}}>
                    <Footer/>
                </Box>
            </Box>
        </Drawer>
    );
}

export default Drawerbar;