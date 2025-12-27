"use client";

import { createClient } from "@/config/supabase/supabase-client";
import { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface contextProps {
    loginWithGoogle: () => Promise<void>,
    logout: () => Promise<void>,
    authLoading: boolean,
    user: User | null
}

const context = createContext<contextProps>({
    loginWithGoogle: async () =>{},
    logout: async () => {},
    authLoading: true,
    user: null
})

const AuthContext = ({ children } : {
    children: React.ReactNode
}) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient()
   
    const updateUser = useCallback((session: Session | null) => {
        setUser(session?.user ?? null)
    }, [])
    
    const loginWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: window.location.origin + "/auth/callback",
                },
            })
            if (error) throw error
        } 
        catch (err) {
            console.error("Login failed:", err)
        }
    }


    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } 
        catch (err) {
            console.error("Login failed:", err)
        }
    }
    
    useEffect(() => {

        const session = supabase.auth.getSession().then(res => {
            updateUser(res.data.session ?? null)
        }).catch(console.error).finally(()=> setLoading(false))
        
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            updateUser(session ?? null)
        })
        
        return () => {
            listener.subscription.unsubscribe()
        }
    }, [updateUser])

  

  return (
    <context.Provider 
        value={{loginWithGoogle, logout, user, authLoading: loading}} 
    >
        {children}
    </context.Provider>
  )
}

export const useAuthContext = () => {
    const Context = useContext(context);
    if(!Context){
        throw new Error("useAuthContext must be used within an AuthContextProvider")
    }
    return Context
}
export default AuthContext