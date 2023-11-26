import Middle from "@/components/Middle/Middle";
import Box from "@mui/material/Box";

const style = {
  width: '100%',
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center',
  minHeight: '100dvh'
}


const Home = ({searchParams}) => {

    const page = parseInt(searchParams.page) || 1;

      return (
          <Box sx={style}>
              <Middle page={page}/> 
          </Box>
        )
};


export default Home;
