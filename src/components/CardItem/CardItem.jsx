'use client'

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { 
    MoreVert, 
    FavoriteBorder, 
    Favorite, 
    Share, 
    Delete, 
    Update } from '@mui/icons-material';
import Link from 'next/link';
import TreadControl from '../TreadControl/TreadControl';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const styleModal = {
    display: 'grid',
    alignItems: 'center', 
    justifyItems: 'center',
    padding: '0px',
    margin: '0px',
    inset: '0'
}

const CardItem = ({key, carddata}) => {
    const [anchorMenu, setAnchorMenu] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const open = Boolean(anchorMenu);
    const { user, tagSlug } = carddata;
    const { data, status } = useSession();
    const router = useRouter();


    // Setting date for card
    const createdAt = new Date(carddata.createdAt);
    const day = createdAt.getDate();
    const month = createdAt.getMonth() + 1; // Months are zero-indexed, adding 1
    const year = createdAt.getFullYear();
    const hours = createdAt.getHours();
    const minutes = createdAt.getMinutes();
    
    // Close the <MoreVert /> menu
    const closeMenu = () => {
        setAnchorMenu(null)
    }

    // Close the <Modal>
    const closeModal = () => {
        setOpenModal(false)
    }
    
    // Delete single tread
    const deleteTread = async () => {
        const res = await fetch(`http://localhost:3000/api/posts/${carddata.slug}`, {
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
            router.push('/')
        };
    };
    
    return (
        <Card key={key} sx={{width: '100%', maxWidth: '800px', marginBlockEnd: '20px'}}>
            <CardHeader
                avatar={ user.image ? 
                <Avatar aria-label="avatar" src={user.image} alt={user.name}/> :
                <Avatar aria-label="avatar" alt={user.name}>
                    {user.name.substring(0, 1).toUpperCase()}
                </Avatar>
                }
                action={ status === 'authenticated' && data.user.email === carddata.userEmail &&
                    <IconButton aria-label="options" onClick={(event) => setAnchorMenu(event.currentTarget)}>
                        <MoreVert />
                    </IconButton>
                }
                title={user.name}
                subheader={`${day}-${month}-${year} at ${hours}:${minutes}`}/>
                <CardMedia
                    component="img"
                    height="20%"
                    image={carddata?.img}
                    alt=""/>
                <CardContent>
                    <Link href={`/tread/${carddata.slug}`}>
                            <Typography variant="body1" color="text" gutterBottom>
                                {carddata.title}
                            </Typography>
                    </Link>
                    <Divider gutterBottom/>
                    <Typography variant="body2" color="text.secondary">
                        {carddata.desc}
                    </Typography>
                <Link href={`/treads?tag=${tagSlug}`}>
                    <Typography variant="body2" color="text.secondary">
                        #{tagSlug}
                    </Typography>
                </Link>
                </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{fill: 'red'}}/>} />
                </IconButton>
                <IconButton aria-label="share">
                    <Share />
                </IconButton>
            </CardActions>
            <Menu
                anchorEl={anchorMenu}
                open={open}
                onClose={closeMenu}
                onClick={closeMenu}
                sx= {{
                    overflow: 'visible',
                    mt: 1.5
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem onClick={deleteTread}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    Delete
                </MenuItem>
                <MenuItem onClick={() => setOpenModal(true)}>
                    <ListItemIcon>
                        <Update />
                    </ListItemIcon>
                    Update
                </MenuItem>
            </Menu>
            <Modal
                sx={styleModal}
                open={openModal}
                onClose={closeModal}
                aria-labelledby="update-modal-title"
                aria-describedby="update-modal-description"
                >
                <Box sx={{marginInline: '100%'}}>
                    <TreadControl 
                        method={'PUT'}
                        carddata={carddata} 
                        slug={carddata.slug}
                        closeModal={closeModal}
                    />
                </Box>
            </Modal>
        </Card>
    );
}



export default CardItem;
