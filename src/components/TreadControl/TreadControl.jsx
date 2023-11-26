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
    width: {xs: '80%', md: '800px'}, 
    padding: '20px'
};

const stylePaper2 = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
};

const TreadControl = ({method, carddata, slug, closeModal}) => {
    const defaultTitle = carddata?.title || '';
    const defaultDesc = carddata?.desc || '';

    const [title, setTitle] = useState(defaultTitle)
    const [desc, setDesc] = useState(defaultDesc)
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState('')
    const router = useRouter();

    // Firebase upload function, wrapped in useEffect to update the uploaded file
    useEffect(()=>{
        const storage = getStorage(app);
        const upload = () => {
            
            // Giving each image unique name with datetime
            const name = new Date().getTime() + file.name
            
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File uploaded at', downloadURL);
                setImageURL(downloadURL);
                });
            }
            );
        }
        // the function inside useEffect will only execute if file is not faulty
        file && upload();
    }, [file])

    const handleSubmit = () => {
        if (method === 'POST') {
            postTread()
        } else if (method === 'PUT') {
            updateTread()
        } else {
            console.log('no method')
        }
    }

    // Function to create slug
    const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Function to create tags
    const tagify = (str) => {
        const regex = /#(\w+)/g;
        const matches = str.match(regex);
        return matches ? matches.map((match) => match.slice(1).toLowerCase()) : []
    }

    // Function to post a single tread
    const postTread = async () => {
        console.log('Request Payload:', {
            title: title,
            desc: desc,
            img: imageURL,
            slug: slugify(title),
            postTags: tagify(desc)
        });
        const res = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                desc: desc,
                img: imageURL,
                slug: slugify(title),
                postTags: tagify(desc)
            }),
        });
        
        // throw error if post is unsuccessful
        if (!res.ok) {
            throw new Error('Failed to post');
        }

        // Push user to the page of the post if post is successful
        const data = await res.json();
        if (data !== undefined) {
            router.refresh();
            // router.push(`/tread/${data.slug}`);
        }
    };

    // Function to update a single tread
    const updateTread = async () => {
        const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                desc: desc,
                img: imageURL,
                slug: slugify(title),
                postTags: tagify(desc)
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
                    >{method === 'POST' ? 'Tell us your story' : 'Update your tread'}
                </Typography>
                <form>
                    <FormGroup>
                        <Paper variant='filled' sx={stylePaper2}>
                                <TextField
                                    sx={{width: '100%', flex: '1'}}                                  
                                    id='title'
                                    label={'Start your tread with a lovely title'}
                                    multiline
                                    rows={1}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    variant='outlined'/>
                                <TextField
                                    sx={{width: '100%'}}
                                    id='desc'
                                    label={'Share your lovely story?'}
                                    multiline
                                    rows={5}
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    variant='outlined'/>
                                <Stack direction='row' sx={{gap: '10px', padding: '10px', alignSelf: 'center'}}>
                                    <input
                                    type='file'
                                    id='image'
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: 'none' }}
                                    />
                                    <IconButton onClick={() => document.getElementById('image').click()} aria-label='add image'>
                                <       Image color= 'primary'/>
                                    </IconButton>
                                    <IconButton aria-label= 'add person'>
                                        <PersonAdd color= 'primary'/>
                                    </IconButton>
                                    <IconButton aria-label= 'add link'>
                                        <AddLink color= 'primary'/>
                                    </IconButton>
                                </Stack>
                                <Button 
                                    disabled={!title || !desc}
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

export default TreadControl;
