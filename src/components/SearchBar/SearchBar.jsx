'use client'

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModeContext } from '@/context/ModeContext';
import { styled } from '@mui/material';

const StyledBox = styled(Box)(({theme}) => ({
    padding: theme.spacing(0),
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius
}))

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter();
    const { mode } = useContext(ModeContext);

    const onSearch = (event) => {
        event.preventDefault();

        if (typeof searchQuery !== 'string') {
            return;
        }

        const encodedSearch = encodeURI(searchQuery);
        console.log(encodedSearch)
        router.push(`/search?query=${encodedSearch}`)
    }

    return (
        <StyledBox sx={{backgroundColor: mode === 'dark' ? 'transparent' : '#fff'}}>
            <form onSubmit={onSearch} style={{width: '100%'}}>
            <TextField
                id= 'searchbar'
                variant= 'outlined'
                fullWidth
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)} 
                InputProps={{
                    startAdornment: <InputAdornment position="start">Search:</InputAdornment>,
                }}
            />
            </form>
        </StyledBox>
    );
}

export default SearchBar;
