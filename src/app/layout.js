import { Inter } from 'next/font/google'
import Navbar from "@/components/Navbar/Navbar";
import PalleteProvider from '@/provider/PalleteProvider';
import './globals.scss'
import { ModeContextProvider } from '@/context/ModeContext';
import { AuthProvider } from '@/provider/AuthProvider';
import Sidebar from '@/components/Sidebar/Sidebar';
import Rightbar from '@/components/Rightbar/Rightbar';
import { Box, Stack } from '@mui/material';
import AddPost from '@/components/AddPost/AddPost';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Treads',
  description: 'Treads for me and you',
}


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <ModeContextProvider>
          <PalleteProvider>
            <div className='container'>
              <Box bgcolor={'background.default'} color={'text.primary'}>
                <Navbar />
                <Stack 
                  direction='row'
                  spacing={0}
                  justifyContent='space-between'
                  paddingBlockStart={10}>
                <Sidebar />
                  <Box sx={{flex: '1 1 60%', display: 'grid', alignItems: 'start', justifyItems: 'stretch', paddingInline: '20px'}}>
                    {children}
                  </Box>
                <Rightbar />
                </Stack>
                <AddPost />
              </Box>
            </div>
          </PalleteProvider>
        </ModeContextProvider>
      </AuthProvider>
      </body>
    </html>
  )
}
