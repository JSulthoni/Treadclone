'use client'

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AddLink, Image, PersonAdd } from '@mui/icons-material';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/utils/firebase';
import { useRouter } from 'next/navigation';


const stylePaper1 = {
    width: {sm: '100%', lg: '800px'}, 
    padding: '20px',
    marginBlockEnd: '20px'
};

const stylePaper2 = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
};

const CommentControl = ({method, mutate, comment, slug, closeModal}) => {
    const defaultDesc = comment?.desc || '';
    const [desc, setDesc] = useState(defaultDesc);
    const router = useRouter();

    const handleSubmit = () => {
        if (method === 'POST') {
            postComment()
        } else if (method === 'PUT') {
            updateComment()
        } else {
            console.log('no method')
        }
    }

    // Function to post a comment
    const postComment = async () => {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                desc: desc, 
                postSlug: slug
            })
        });

        mutate();
        setDesc('');
    };

    // Function to update a comment
    const updateComment = async () => {
        const { id } = comment;
        console.log(id)
        const res = await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                desc: desc
            }),
        });
        
        // Throw error if update is unsuccessful
        if (!res.ok) {
            throw new Error('Failed to update');
        }

        // Refresh the page and close modal after successful update
        const data = await res.json();
        if (data) {
            router.refresh();
            closeModal();
        }
    };

    return (
        <Paper 
            variant='outlined' 
            sx={stylePaper1}
            >
                <Typography
                    onClick={closeModal}
                    variant='h6'
                    textAlign='center'
                    >{method === 'POST' ? 'Share your thought about this tread' : 'Update your thought'}
                </Typography>
                <form>
                    <FormGroup>
                        <Paper variant='filled' sx={stylePaper2}>
                                <TextField
                                    sx={{width: '100%'}}
                                    id='desc'
                                    label={`What's your thought about this tread?`}
                                    multiline
                                    rows={5}
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    variant='outlined'/>
                                <Button 
                                    disabled={!desc}
                                    onClick={handleSubmit} 
                                    sx={{width: '150px', alignSelf: 'center'}} 
                                    variant='contained'
                                    >
                                    {method === 'POST' ? 'Post' :'Update'}
                                </Button>
                        </Paper>
                    </FormGroup>
                </form>
        </Paper>
    );
}

export default CommentControl;
