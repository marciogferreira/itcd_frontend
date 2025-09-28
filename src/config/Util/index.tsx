const Util = {
    redirect: () => {
        location.reload();
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

    tiposLogradouros: () => {
        return [
            { label: "Aeroporto", value: "Aeroporto" },
            { label: "Alameda", value: "Alameda" },
            { label: "Área", value: "Área" },
            { label: "Avenida", value: "Avenida" },
            { label: "Campo", value: "Campo" },
            { label: "Chácara", value: "Chácara" },
            { label: "Colônia", value: "Colônia" },
            { label: "Condomínio", value: "Condomínio" },
            { label: "Conjunto", value: "Conjunto" },
            { label: "Distrito", value: "Distrito" },
            { label: "Esplanada", value: "Esplanada" },
            { label: "Estação", value: "Estação" },
            { label: "Estrada", value: "Estrada" },
            { label: "Favela", value: "Favela" },
            { label: "Fazenda", value: "Fazenda" },
            { label: "Feira", value: "Feira" },
            { label: "Jardim", value: "Jardim" },
            { label: "Ladeira", value: "Ladeira" },
            { label: "Lago", value: "Lago" },
            { label: "Lagoa", value: "Lagoa" },
            { label: "Largo", value: "Largo" },
            { label: "Loteamento", value: "Loteamento" },
            { label: "Morro", value: "Morro" },
            { label: "Núcleo", value: "Núcleo" },
            { label: "Parque", value: "Parque" },
            { label: "Passarela", value: "Passarela" },
            { label: "Pátio", value: "Pátio" },
            { label: "Praça", value: "Praça" },
            { label: "Quadra", value: "Quadra" },
            { label: "Recanto", value: "Recanto" },
            { label: "Residencial", value: "Residencial" },
            { label: "Rodovia", value: "Rodovia" },
            { label: "Rua", value: "Rua" },
            { label: "Setor", value: "Setor" },
            { label: "Sítio", value: "Sítio" },
            { label: "Travessa", value: "Travessa" },
            { label: "Trecho", value: "Trecho" },
            { label: "Trevo", value: "Trevo" },
            { label: "Vale", value: "Vale" },
            { label: "Vereda", value: "Vereda" },
            { label: "Via", value: "Via" },
            { label: "Viaduto", value: "Viaduto" },
            { label: "Viela", value: "Viela" },
            { label: "Vila", value: "Vila" }
        ]
    }
};

export default Util;