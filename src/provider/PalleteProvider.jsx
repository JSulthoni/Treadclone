'use client'

import { ModeContext } from "@/context/ModeContext";
import { createTheme, ThemeProvider } from "@mui/material";
import React, {useContext, useEffect, useState} from "react";

const font = {
    h3 : {
        fontSize : '3rem',
        '@media (max-width:1280px)': {
            fontSize: '2.5rem',
        },
        '@media (max-width:768px)': {
            fontSize: '2rem',
        },
    },
    h4 : {
        fontSize : '2.125rem',
        '@media (max-width:1280px)': {
            fontSize: '1.825rem',
        },
        '@media (max-width:768px)': {
            fontSize: '1.525rem',
        },
    },
    h6 : {
        fontSize : '1.25rem',
        '@media (max-width:1280px)': {
            fontSize: '1.15rem',
        },
        '@media (max-width:768px)': {
            fontSize: '1.05rem',
        },
    },
    body1 : {
        fontSize : '1rem',
        '@media (max-width:1280px)': {
            fontSize: '0.95rem',
        },
        '@media (max-width:768px)': {
            fontSize: '0.9rem',
        },
    },
    subtitle1 : {
        fontSize : '1rem',
        '@media (max-width:1280px)': {
            fontSize: '0.95rem',
        },
        '@media (max-width:768px)': {
            fontSize: '0.9rem',
        },
    }
}

const light = {
    palette : {
        mode: 'light',
    },
    typography : font,
}


const dark = {
    palette : {
        mode: 'dark',
    },
    typography : font,
}


const PalleteProvider = ({children}) => {
    const { mode } = useContext(ModeContext)
    const theme = createTheme(mode === 'light' ? light : dark)
    const [mount, setMount] = useState(false)
    
    // This part means to apply the ThemeProvider after the component is mounted
    useEffect(() => {
        setMount(true)
        return () => {
        };
    }, []);

    if (mount) {
        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

export default PalleteProvider;
