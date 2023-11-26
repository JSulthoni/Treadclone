import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const getTags = async () => {
    const BASE_URL = process.env.BASE_URL
    const res = await fetch('http://localhost:3000/api/tags', {
        cache: 'no-store'
    })
    
    if (!res.ok) {
        throw new Error('Failed to get tags')
    }

    return res.json()
};


const getPopular = async () => {
    const res = await fetch('http://localhost:3000/api/posts?sort=views&limit=3', {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to get popular post')
    }

    return res.json()
}

const styleBox = {
    width: '20%'
};

const styleBox1 = {
    padding: '20px',
    display: 'flex', 
    flexWrap: 'wrap',
    gap: '10px',
    marginBlockEnd: '20px'
}


const Rightbar = async () => {
    const tags = await getTags();
    const popular = await getPopular();

    return (
        <Box sx={{flex:'1 1 20%', display: {xs: 'none', lg: 'block'}}}>
            <Box position= 'fixed' sx={styleBox}>
                <Paper>
                    <Box display='grid' placeItems= 'center start' p={2}>
                    <Typography
                        variant='h6'
                        >What's trending?</Typography>
                    </Box>
                    <Divider />
                    <Box sx={styleBox1}>
                        {tags.map((tag) => {
                            return(
                                <Link key={tag.id} href={`/treads?tag=${tag.title}`}>
                                    <Button variant='outlined'>#{tag.title}</Button>
                                </Link>
                            )
                        })}
                    </Box>
                </Paper>
                <Paper>
                <Box display='grid' placeItems= 'center start' p={2}>
                    <Typography
                        variant='h6'
                        >Get's updated with the current popular</Typography>
                </Box>
                <Divider />
                <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'transparent' }}>
                    {popular?.posts.map((post) => {
                        const { user } = post;
                        return (
                        <Link href={`/tread/${post.slug}`} key={post.id}>
                            <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={user.name} src={user.image} />
                                    </ListItemAvatar>
                                <ListItemText
                                    primary={post.title}
                                    secondary={
                                    <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    {user.name} : <br></br>
                                    </Typography>
                                    {post.desc}
                                    </>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Link>
                        )
                    })}
                </List>
                </Paper>
            </Box>
        </Box>
    );
}

export default Rightbar;
