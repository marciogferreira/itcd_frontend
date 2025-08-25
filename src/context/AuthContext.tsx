import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import Api from "../config/Api";
import Util from "../config/Util";

type PropsData = {
   children: ReactElement 
}

type PropsValuesData = {
   isLogged: boolean,
   setIsLogged: (value: boolean) => void,
   user: any, 
   setUser: (value: any) => void,
   loading: boolean,
   setLoading: (value: boolean) => void,
   signIn: (token: string) => void,
   signOut: () => void,
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

    function signIn(token: string) {
        setIsLogged(false);
        Util.setToken(token)
        location.href = '/';
    }

    function signOut() {
        setIsLogged(false);
        localStorage.removeItem('sis@itcd_portal');
        location.href = '/';
    }

    async function getMe() {
        const response = await Api.post('me');
        setUser(response.data)
    }

    useEffect(() => {
        if(localStorage.getItem('sis@itcd_portal')) {
            getMe();
            setIsLogged(true);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, loading, setLoading, signIn, signOut } as PropsValuesData}>
            {children}
        </AuthContext.Provider>
    )
}   