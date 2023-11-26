'use client'

import { Box, Button, Paper, Typography } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const {status} = useSession();
    
    const router = useRouter();

    if (status === 'loading') {
        return (
            <Box sx={{flex: '5', display: 'grid', placeItems: 'center center', minHeight: '100dvh'}}>
            <Paper variant='outlined'>
                <Typography
                    variant='h1'
                    fontWeight={3}
                    >Loading...</Typography>
            </Paper>    
        </Box>
        )
    }
    
    if (status === 'authenticated') {
        router.push('/')
    }

    return (
        <Box sx={{flex: '5', display: 'grid', placeItems: 'center center', minHeight: '100dvh'}}>
            <Paper variant='outlined'>
            <Box sx={{display: 'grid', 
                    placeItems: 'center center',
                    rowGap: '30px'}}>
                <Button
                    disableElevation
                    variant='contained'
                    onClick={()=>signIn('google')}
                    color='warning'>Sign in with Google</Button>
                <Button
                    disableElevation
                    variant='contained'
                    color='primary'>Sign in with Github</Button>
                <Button
                    disableElevation
                    variant='contained'
                    color='success'>Sign in with Treads</Button>
            </Box>
            </Paper>    
        </Box>
    );
}

export default LoginPage;