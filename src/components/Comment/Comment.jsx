'use client'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import Auth from '../Auth/Auth';
import CommentItem from '../CommentItem/CommentItem';
import CommentControl from '../CommentControl/CommentControl';
import fetcher from '@/utils/fetcher';


const style = {
    display: 'grid',
    alignItems: 'center', 
    justifyItems: 'center',
    marginBlockStart: '20px'
};

const Comment = ({slug}) => {
    const { status } = useSession();
    const {data, mutate, isLoading} = useSWR(`/api/comments?postSlug=${slug}`, fetcher);
    
    return (
        <Box sx={{width: '100%', maxWidth: '800px'}}>
            {status === 'authenticated' ? 
            <CommentControl method={'POST'} slug={slug} mutate={mutate}/>
            : 
            <Box sx={style}>
                <Button variant='outlined'>
                    <Link href='/login'>
                        <Auth/>
                    </Link>
                </Button>    
            </Box> }
            {isLoading ? 
            <Card>
                <CardHeader
                    avatar={
                    <Avatar aria-label='avatar' alt='avatar'>
                        T
                    </Avatar>
                    }
                    title= 'loading comment...'
                    subheader='loading comment...'/>
                <Divider />
                <CardActionArea focusHighlight>
                    <Box sx={{ p: 2, maxHeight: 200}}>  
                        <Typography
                        variant='subtitle1'
                        fontWeight={300}
                        >loading comment...</Typography>
                    </Box>
                </CardActionArea>
            </Card> 
            :
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <Box sx={style}>
                    <Typography variant='h3'>Latest Comment</Typography>
                </Box>
                {data?.comments.map((comment) => {
                    return (
                        <CommentItem key={comment.id} comment={comment}/>
                    )} 
                )}
            </Box> 
            }
        </Box>
    );
}

export default Comment;
