"use client";

import React from "react";
import { useAuthContext } from "./auth-context";

const LoadingContext = ({ children } : {
    children: React.ReactNode
}) => {
    const { authLoading } = useAuthContext();
    
    if(authLoading) return null
    return (
        <div>
            {children}
        </div>
    )
}

export default LoadingContext