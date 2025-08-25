import { createContext, ReactElement, useContext, useEffect, useState } from "react";

type PropsData = {
   children: ReactElement 
}

type PropsValuesData = {
   isLogged: boolean,
   setIsLogged: (value: boolean) => void,
   user: null | {}, 
   setUser: (value: any) => void,
   loading: boolean,
   setLoading: (value: boolean) => void,
   handleLogin: () => void,
   handleLogout: () => void,
}

export const AuthContext = createContext<PropsValuesData>({} as PropsValuesData);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

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
        <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, loading, setLoading, handleLogin, handleLogout } as PropsValuesData}>
            {children}
        </AuthContext.Provider>
    )
}   