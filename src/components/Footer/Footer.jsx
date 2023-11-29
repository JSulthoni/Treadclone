import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
    return (
        <Box>
            <Divider />
        <Stack direction='column' spacing={0} p={1}>
            <Typography
                variant='caption'
                component='p'
                >
                © 2023. Javier Sulthoni Development. All rights reserved.
            </Typography>
            <Typography
                    variant='caption'
                    component='p'
                    color='primary'
                    >
                    <a href='https://github.com/JSulthoni/Treadclone' target='_blank'>
                    Source code!
                    </a>
            </Typography>
        </Stack>
        </Box>
    );
}

export default Footer;
