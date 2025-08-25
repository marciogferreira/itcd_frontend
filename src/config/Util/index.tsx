const Util = {
    redirect: () => {
        // location.reload();
    },
    removeToken: () => {
        localStorage.removeItem("SYS@TOKEN_ITCD");
    },
    setToken: (token: string) => {
        localStorage.setItem("SYS@TOKEN_ITCD", token);
    },
    getToken: () => {
        const value = localStorage.getItem("SYS@TOKEN_ITCD");
        return value;
    },
    getTokenBearer: () => {
        
    },
    setUser: (token: string) => {
        localStorage.setItem("SYS@TOKEN_ITCD_USER", JSON.stringify(token));
    },
    getUser: () => {
        const value: any = localStorage.getItem("SYS@TOKEN_ITCD_USER");
        return JSON.parse(value);
    },
    removeUser: () => {
        localStorage.removeItem("SYS@TOKEN_ITCD_USER");
    },  
};

export default Util;