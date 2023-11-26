'use client'

import React from 'react';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation';

const style = {
    inset: 'auto 0',
    marginInline: 0,
    marginBlock: 10,
    display: 'flex',
    justifyContent: 'space-between',
    color: 'primary',
    maxWidth: 800
}

const Pagination = ({page, hasNext, hasPrev}) => {

    const router = useRouter();

    const handlePrevious = () => {
        router.push(`?page=${page - 1}`)
    }

    const handleNext = () => {
        router.push(`?page=${page + 1}`)
    };

    return (
            <Box sx={style}>
                <Button onClick={handlePrevious} disabled={!hasPrev}>
                    <Typography variant='body2'>
                        PREVIOUS TREADS
                    </Typography>
                </Button>
                <Button onClick={handleNext} disabled={!hasNext}>
                    <Typography variant='body2'>
                        NEXT TREADS
                    </Typography>   
                </Button>
            </Box>
    );
}

export default Pagination;
