'use client'

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import styles from './SearchBar.module.scss'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    console.log(searchQuery)


    const router = useRouter();

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
        <form className={styles.container} onSubmit={onSearch}>
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
    );
}

export default SearchBar;
