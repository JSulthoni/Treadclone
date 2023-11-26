'use client'

import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import { Add } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import TreadControl from '../TreadControl/TreadControl';

const styleModal = {
    display: 'grid',
    placeItems: 'center center',
    padding: '0px',
    margin: '0px',
    inset: '0'
};

const styleToolTip = {
    position: 'fixed', 
    bottom:'20px', 
    left: { 
        xs: 'calc(50% - 20px)', 
        sm: '30px'}
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
                <TreadControl 
                    method={'POST'}
                />
            </Modal> 
            </>}
        </>
    );
}

export default AddPost;
