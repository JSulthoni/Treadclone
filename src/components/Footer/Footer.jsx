import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import styles from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
            <Box>
                <Image src='' alt='' />
                <Typography
                variant='h6'
                component='h1'
                gutterBottom>NOTE.IFY</Typography>
                <Divider />
                <Typography
                variant='body1'
                component='h1'
                gutterBottom>SOME IMPORTANT WORKDS ABOUT HOW AMAZING THIS APPLICATION IS</Typography>
            </Box>
            </div>
            {/* <div className={styles.right}>
                <Link href=''>
                    <Typography
                    variant='subtitle1'
                    color='primary'
                    >Popular</Typography>
                </Link>
                <Link href=''>
                    <Typography
                    variant='subtitle1'
                    color='primary'
                    >Trending</Typography>
                </Link>
                <Link href=''>
                    <Typography
                    variant='subtitle1'
                    color='primary'
                    >Picked</Typography>
                </Link>
                <Link href=''>
                    <Typography
                    variant='subtitle1'
                    color='primary'
                    >Homepage</Typography>
                </Link>
                <Link href=''>
                    <Typography
                    variant='subtitle1'
                    color='primary'
                    >Abouts</Typography>
                </Link>
            </div> */}
        </div>
    );
}

export default Footer;
