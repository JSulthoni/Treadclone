'use client'

import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { Add } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import TreadControl from '../TreadControl/TreadControl';

const styleModal = {
    display: 'grid',
    alignItems: 'center', 
    justifyItems: 'center',
    padding: '0px',
    margin: '0px',
    inset: '0',
};

const styleToolTip = {
    position: 'fixed', 
    bottom: { 
        xs: '20px', 
        sm: '80px'}, 
    left: { 
        xs: 'calc(50% - 30px)', 
        sm: '20px'}
}; 

const AddPost = () => {
    const [openModal, setOpenModal] = useState(false);
    const {status} = useSession();

    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <>
            {status === 'authenticated' && 
            <>
            <Tooltip 
                onClick={() => setOpenModal(true)} 
                title='Post a tread'  
                sx={styleToolTip}
                >
                <Fab color='primary' aria-label='add'>
                    <Add />
                </Fab>
            </Tooltip>
            <Modal
                sx={styleModal}
                open={openModal}
                onClose={closeModal}
                aria-labelledby="post-modal-title"
                aria-describedby="post-modal-description"
                >
                <Box sx={{marginInline: '100%'}}>
                <TreadControl 
                    method={'POST'}
                />
                </Box>
            </Modal> 
            </>}
        </>
    );
}

export default AddPost;
