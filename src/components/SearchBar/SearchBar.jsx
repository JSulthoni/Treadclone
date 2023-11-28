'use client'

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styles from './SearchBar.module.scss'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const SearchBar = () => {
    const [search, setSearch] = useState('')
    const open = Boolean(search);
    const router = useRouter();

    const onSearch = (event) => {
        event.PreventDefault();
        const encodedSearch = encodeURI(search);
        console.log(encodedSearch)
        router.push(`/search?query=${encodedSearch}`)
    }

    return (
        <form className={styles.container} onSubmit={onSearch}>
            <TextField
                id= 'searchbar'
                variant= 'outlined'
                fullWidth
                value={search}
                onChange={(event) => setSearch(event.target.value)} 
                InputProps={{
                    startAdornment: <InputAdornment position="start">Search:</InputAdornment>,
                }}
            />
        </form>
    );
}

export default SearchBar;
