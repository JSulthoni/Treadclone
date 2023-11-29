'use client'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const styleButton = {
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'capitalize',
    width: '100%'
};


const LoginPage = () => {
    const {status} = useSession();
    
    const router = useRouter();

    if (status === 'loading') {
        return (
            <Box sx={{flex: '5', display: 'grid', alignItems: 'center', justifyItems: 'center', minHeight: '100dvh'}}>
                <Paper variant='outlined'>
                    <Typography
                        variant='h3'
                        fontWeight={2}>
                        Loading..
                    </Typography>
                </Paper>    
            </Box>
        )
    }
    
    if (status === 'authenticated') {
        router.push('/')
    }

    const provider = ['github', 'google', 'facebook', 'discord', 'twitter', 'kakao']

    return (
        <Box sx={{display: 'grid', alignItems: 'center', justifyItems: 'center', minHeight: '100dvh'}}>
            <Paper variant='outlined' sx={{padding: '20px', textAlign: 'center',}}>
                <Typography
                    variant='h6'
                    fontWeight={1}
                    sx={{marginBlockEnd: '20px'}}>
                    Sign In with your beloved account!
                </Typography>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {provider.map((prov, index) => {
                        return (
                            <Grid item key={index} xs={2} sm={4} md={4}>
                                <Button variant='outlined' sx={styleButton}>
                                    <Image src={`/${prov}.svg`} alt={prov} width="64" height="64" onClick={() => signIn(prov)}/>
                                    {prov}
                                </Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>    
        </Box>
    );
}

export default LoginPage;