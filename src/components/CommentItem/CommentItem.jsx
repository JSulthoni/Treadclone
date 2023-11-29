'use client'


import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { Delete, MoreVert, Update } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CommentControl from '../CommentControl/CommentControl';


const styleModal = {
    display: 'grid',
    alignItems: 'center', 
    justifyItems: 'center',
    gap: 20,
    padding: '0px',
    margin: '0px',
    inset: '0'
};

const CommentItem = ({key, comment}) => {
    const commentData = comment || undefined;
    const { user } = comment;
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    const [openModal, setOpenModal] = useState(false)

    const router = useRouter()
    const { data, status } = useSession();


    // Creating date and time for comments
    const createdAt = new Date(comment.createdAt);
    const day = createdAt.getDate();
    const month = createdAt.getMonth() + 1; // Months are zero-indexed, adding 1
    const year = createdAt.getFullYear();
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();
    
    // Function to close <MoreVert /> menu
    const closeMenu = () => {
        setAnchor(null)
    };

    // Function to close <MoreVert /> menu
    const closeModal = () => {
        setOpenModal(false)
    };
    
    // Delete single comment
    const deleteComment = async () => {
        const { id } = commentData
        const res = await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: 'DELETE',
            cache: 'no-store'
        });

        // Throw error if deleting is unsuccessful
        if (!res.ok) {
            throw new Error('Failed to delete')
        };

        // Push user to homepage if deleting is successful
        const data = await res.json();
        if (data) {
            router.refresh()
        };
    };

    return (
        <Card key={key}>
            <CardHeader
                avatar={ user.image ? 
                <Avatar aria-label="avatar" src={user.image} alt={user.name}/> :
                <Avatar aria-label="avatar" alt={user.name}>
                    {user.name.substring(0, 1).toUpperCase()}
                </Avatar>
                }
                action={ status === 'authenticated' && data.user.email === comment.userEmail &&
                <IconButton aria-label="options" onClick={(event) => setAnchor(event.currentTarget)}>
                    <MoreVert />
                </IconButton>
                }
                title={user.name}
                subheader={`${day}-${month}-${year} at ${hours}:${minutes}`}/>
            <Divider />
            <CardActionArea focusHightlight>
                <Box sx={{ p: 2, maxHeight: 200}}>  
                    <Link href=''>
                        <Typography
                        variant='subtitle1'
                        fontWeight={300}
                        gutterBottom
                        >{commentData.desc}
                        </Typography>
                    </Link>
                </Box>
            </CardActionArea>
            <Menu
                anchorEl={anchor}
                open={open}
                onClose={closeMenu}
                onClick={closeMenu}
                sx= {{
                    overflow: 'visible',
                    mt: 1.5
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem onClick={() => setOpenModal(true)}>
                    <ListItemIcon>
                        <Update />
                    </ListItemIcon>
                    Update
                </MenuItem>
                <MenuItem onClick={deleteComment}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
            <Modal
                sx={styleModal}
                open={openModal}
                onClose={closeModal}
                aria-labelledby="post-a-comment"
                aria-describedby="post-a-comment-modal"
                >
                <CommentControl 
                    method= {'PUT'}
                    comment= {commentData}
                    closeModal= {closeModal}
                    />
            </Modal> 
        </Card>
    );
}

export default CommentItem;
