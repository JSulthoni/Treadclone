import Link from 'next/link';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import { signOut, useSession } from 'next-auth/react';
import { Login, Logout } from '@mui/icons-material';

const Auth = () => {
    const {status} = useSession();

    return (
        <>
            { status === 'authenticated' ? (
                <Stack direction='row' alignItems='center' onclick={signOut}>
                    <ListItemIcon>
                        <Logout color='error'/>
                    </ListItemIcon>
                    <Typography
                        variant='body1'
                        color= 'error'>
                        Logout
                    </Typography>
                </Stack>
            ) : (
                <Stack direction='row' alignItems='center' >
                    <ListItemIcon>
                        <Login color='primary'/>
                    </ListItemIcon>
                    <Link href='/login'>
                        <Typography
                            variant='body1'
                            color= 'primary'>
                            Login
                        </Typography>
                    </Link>
                </Stack>
            ) }
        </>
    );
}

export default Auth;
