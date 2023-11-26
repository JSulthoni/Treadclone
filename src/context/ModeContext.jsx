'use client'

import { createContext, useEffect, useState } from "react";



export const ModeContext = createContext();

const getMode = () => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem('mode')
        return value || 'light'
    }
};

export const ModeContextProvider = ({children}) => {
    const [mode, setMode] = useState(() => {
        return getMode()
    });

    const toggle = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    };
    
    useEffect(() => {
        localStorage.setItem('mode', mode)
    }, [mode]);

    return (
    <ModeContext.Provider value={{mode, toggle}}>
        {children}
    </ModeContext.Provider>
    )
};
