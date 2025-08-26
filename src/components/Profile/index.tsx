import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { useAuth } from "../../context/AuthContext";

function Profile() {
    const { user } = useAuth()
    const [dataHora, setDataHora] = useState(new Date());

    const formatarData = (data: any) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
        const ano = data.getFullYear();
        const meses = {
            '01': 'Janeiro',
            '02': 'Fevereiro',
            '03': 'Março',
            '04': 'Abril',
            '05': 'Maio',
            '06': 'Junho',
            '07': 'Julho',
            '08': 'Agosto',
            '09': 'Setembro',
            '10': 'Outubro',
            '11': 'Novembro',
            '12': 'Dezembro'
        } as any;
        return `${dia} de ${meses[mes]} de ${ano}`;
      };

    useEffect(() => {
            const timer = setInterval(() => {
            setDataHora(new Date());
            }, 1000);
        
            return () => clearInterval(timer); // Cleanup do intervalo
        }, []);
    

    return (
        <>
            
            <div className="flex">
                <Avatar username={user.nome || 'Admin'} />
                <div>
                    Olá, <strong>{user.name || 'Admin'}</strong>
                    <br />
                    <small>
                        {formatarData(dataHora)}
                    </small>
                    <br />
                    <small>
                        Versão: 3.0.5
                    </small>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Profile;