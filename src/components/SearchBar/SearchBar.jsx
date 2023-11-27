'use client'

import InputAdornment from '@mui/material/InputAdornment';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';

const style = {
    backgroundColor: 'transparent',
    padding: '0',
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'center'
};


const SearchBar = () => {
    const [search, setSearch] = useState('')
    const open = Boolean(search)

    return (
        <Box sx={style}>
            <TextField
                id= 'searchbar'
                variant= 'outlined'
                fullWidth 
                InputProps={{
                    startAdornment: <InputAdornment position="start">Search:</InputAdornment>,
          }}
            />
        </Box>
    );
}

export default SearchBar;
