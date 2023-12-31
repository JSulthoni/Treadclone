'use client'

import React from 'react';
import { Box, Typography, Paper, Pagination } from '@mui/material';
import Middle from '@/components/Middle/Middle';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

const styleBox = {
    width: '100%',
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    minHeight: '100dvh'
};

const stylePaper = {
    paddingBlock: '20px', 
    display: 'grid', 
    alignItems: 'center', 
    justifyItems: 'center',
    width: '100%', 
    maxWidth: '800px'
};



const Search = () => {
    const searchQuery = useSearchParams();
    const query = searchQuery ? searchQuery.get('query') : null;
    const encodedQuery = encodeURI(query || '');

    const { data, mutate, isLoading } = useSWR(`/api/search?query=${encodedQuery}`, fetcher)



    return (
        <Box sx={styleBox}>
            <Paper variant='outlined' sx={stylePaper}>
                <Typography
                sx={{
                    textTransform: 'capitalize'
                }}
                variant='h3'>Discover Treads</Typography>
            </Paper>
            {!isLoading && 
                <React.Fragment>
                    {data?.map((post) => {
                        return(
                            <CardItem key={post.id} carddata={post}/>
                        )
                    })}
                </React.Fragment>
            }
        </Box>
    );
}

export default Search;
