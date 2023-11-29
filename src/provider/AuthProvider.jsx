'use client'

import React from "react";
import { SessionProvider } from 'next-auth/react'

export const AuthProvider = ({children}) => {
    return (
        <React.Fragment>
            <SessionProvider>
                {children}
            </SessionProvider>
        </React.Fragment>
    );
}

