import * as React from 'react'
import Pagination from '../Pagination/Pagination';
import Box from '@mui/material/Box';
import CardItem from '../CardItem/CardItem';




// Getting count of post
const BASE_URL = process.env.BASE_URL
const getTreads = async (page, tag) => {
    const res = await fetch(`${BASE_URL}/api/posts?page=${page}&tag=${tag || ''}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        throw new Error('failed')
    }

    return res.json()
};

const Middle = async ({page, tag}) => {
    const { posts, count } = await getTreads(page, tag);
    
    // Pagination, displaying 10 cards per page
    const POST_PER_PAGE = 10;
    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

    return (
        <>
            {posts?.map((post) => {
                return(
                    <CardItem key={post.id} carddata={post}/>
                )
            })}
            <Box sx={{
                paddingInline: {
                    xs: 0,
                    sm: 10
                },
                alignSelf: 'stretch'
            }}>
                <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
            </Box>
        </>
    );
}

export default Middle;
