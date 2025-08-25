import { createContext, ReactElement, useEffect, useState } from "react";

type PropsData = {
   children: ReactElement 
}

export const AuthContext = createContext({});

export default function AuthProvider({ children }: PropsData) {

    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    function handleLogin() {
        setIsLogged(false);
        localStorage.setItem('sis@itcd_portal', '123123');
        location.href = '/';
    }

    function handleLogout() {
        setIsLogged(false);
        localStorage.removeItem('sis@itcd_portal');
        location.href = '/';
    }

    useEffect(() => {
        if(localStorage.getItem('sis@itcd_portal')) {
            setIsLogged(true);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, loading, setLoading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}   