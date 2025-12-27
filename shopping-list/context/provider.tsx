"use client";

import React from "react";
import AuthContext from "./auth-context";
import LoadingContext from "./loading-context";

const Provider = ({ children } : {
    children: React.ReactNode
}) => {
  return (
    <AuthContext>
      <LoadingContext>
        {children}
      </LoadingContext>
    </AuthContext>
  )
}

export default Provider