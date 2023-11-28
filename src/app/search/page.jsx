import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Middle from '@/components/Middle/Middle';
import { useSearchParams } from 'next/navigation';

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
    placeItems: 'center center',
    width: '100%', 
    maxWidth: '800px'
};
    
const Search = ({searchParams}) => {
    const page = parseInt(searchParams) || 1;
    const { tag } = searchParams || '';

    const searchQuery = useSearchParams();
    console.log('searchQuery: ', searchQuery);

    return (
        <Box sx={styleBox}>
            <Paper variant='outlined' sx={stylePaper}>
                <Typography
                sx={{
                    textTransform: 'capitalize'
                }}
                variant='h3'>Discover {tag} Treads</Typography>
            </Paper>
            <Middle page={page} tag={tag}/>
        </Box>
    );
}

export default Search;
