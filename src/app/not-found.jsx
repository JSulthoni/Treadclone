import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";

const NotFound = () => {
    return (
        <Box sx={{minHeight: '100dvh', display: 'grid', placeItems: 'center center'}}>
            <Paper variant='outlined' sx={{padding: '20px', textAlign: 'center'}}>
            <Typography variant= 'h6'>Sorry</Typography>
            <Typography variant= 'body1' gutterBottom>We cant find the page you are looking for!</Typography>
            <Typography variant= 'body2' color='primary'><Link href='/'>Go back to homepage</Link></Typography>
            </Paper>
        </Box>
    );
}

export default NotFound;
