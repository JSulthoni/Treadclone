import { Typography, Box, Paper } from '@mui/material';
import CardItem from '@/components/CardItem/CardItem';
import Comment from '@/components/Comment/Comment'


const styleBox1 = {
    width: '100%',
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    minHeight: '100dvh'
};

const stylePaper = {
    paddingBlock: '20px', 
    display: 'grid', 
    placeItems: 'center center',
    width: '100%',
    maxWidth: '800px'
};

const styleBox2 = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'stretch',
    width: '100%',
    maxWidth: '800px'
};

const BASE_URL = process.env.BASE_URL
const getNote = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed");
    }
    
    const data = await res.json();
    return data;
};

const Note = async ({params}) => {
    const { slug } = params;
    const post = await getNote(slug)
    return (
        <Box sx={styleBox1}>
            <Paper variant='outlined' sx={stylePaper}>
                <Typography
                variant='h3'>Treads</Typography>
            </Paper>
            <Box sx={styleBox2}>
                <CardItem key={post.id} carddata={post}/>
                <Comment slug={slug} />
            </Box>
        </Box>
    );
}

export default Note;
