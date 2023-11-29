'use client'

import React, { useState, useEffect } from 'react';
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
import { getPopular, getTags, getUser } from '@/utils/getter';

// Separate compoent for rendering trending tags
const TrendingTags = ({ tags }) => (
    <Box sx={{ padding: '20px', marginBlockEnd: '20px' }}>
        {tags.map((tag) => (
            <Link key={tag.id} href={`/treads?tag=${tag.title}`}>
                <Button variant="outlined">#{tag.title}</Button>
            </Link>
        ))}
    </Box>
);

// Separate component for rendering a single post item
const PostItem = ({ post }) => (
    <Link href={`/tread/${post.slug}`} key={post.id}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={post.user.name} src={post.user.image} />
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
                        {post.user.name} : <br></br>
                    </Typography>
                    {post.desc}
                    </>
                }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
    </Link>
);

// Separate component for rendering suggested user
const SuggestedUser = ({ user }) => (
    <React.Fragment key={user.id}>
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar alt={user.name} src={user.image} />
            </ListItemAvatar>
            <ListItemText
                primary={user.name}
                secondary={
                    <>
                        <Typography
                            sx={{display: 'inline'}}
                            component='span'
                            variant='body2'
                            color='text.primary'
                            >
                            {user.posts.length} Treads
                        </Typography>
                    </>
                }/>
        </ListItem>
        <Divider variant='inset' component='li' />
    </React.Fragment>
)

const Rightbar = () => {
    const [loading, setLoading] = useState(true)
    const [tags, setTags] = useState([]);
    const [popular, setPopular] = useState([]);
    const [users, setUsers] = useState([]);

    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const _tags = await getTags()
                const _popular = await getPopular()
                const _users = await getUser()
                setTags(_tags)
                setPopular(_popular.posts)
                setUsers(_users)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <Box sx={{ flex: '1 1 20%', display: { xs: 'none', lg: 'block' } }}>
        { loading ? 
        <Box></Box> 
        : 
        <Box position="sticky" sx={{ width: '100%', top: '0', right: '0' }}>
            {/* Trending Tags */}
            <Paper>
                <Box sx={{display: 'grid', alignItems: 'center', justifyItems: 'start', padding: '20px'}}>
                    <Typography variant="h6">What's trending?</Typography>
                </Box>
                <Divider />
                <TrendingTags tags={tags} />
            </Paper>

            {/* Popular Posts */}
            <Paper>
                <Box sx={{display: 'grid', alignItems: 'center', justifyItems: 'start', padding: '20px'}}>
                    <Typography variant="h6">Get's updated with the populars!</Typography>
                </Box>
                <Divider />
                <Box sx={{ marginBlockEnd: '20px' }}>
                    <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'transparent' }}>
                    {popular?.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    </List>
                </Box>
            </Paper>

            {/* Suggested Users */}
            <Paper>
                <Box sx={{display: 'grid', alignItems: 'center', justifyItems: 'start', padding: '20px'}}>
                    <Typography variant="h6">Who's to follow?</Typography>
                </Box>
                <Divider />
                <Box sx={{ marginBlockEnd: '20px' }}>
                    <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'transparent' }}>
                    {users?.map((user) => (
                        <SuggestedUser key={user.id} user={user} />
                    ))}
                    </List>
                </Box>
            </Paper>
        </Box>}
    </Box>
  );
}

export default Rightbar;
