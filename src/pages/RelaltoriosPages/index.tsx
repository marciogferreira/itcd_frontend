import { useState } from "react"
import RelatoriosPDF from "../../components/RelatoriosPDF";
import ComponentCard from "../../components/common/ComponentCard";

export default function RelatoriosPages() {

    const[tipoRelatorio, setTipoRelatorio] = useState('');
    const[show, setShow] = useState(false);

    function handleGerar() {
        setShow(true);
    }

    return (
        <ComponentCard desc="Emita Relatórios em PDF" title="Relatórios">

            <RelatoriosPDF 
                title="Relatório"
                endPoint={tipoRelatorio}
                params={{
                    tipo: tipoRelatorio
                }}
                show={show} 
                setShow={setShow}
            />
            <form action="">
                <div>
                    <label htmlFor="">Tipo de Relatório</label>
                    <select onChange={(e) => setTipoRelatorio(e.target.value)} name="tipo_relatorio" id="tipo_relatorio"
                        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-600 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
                        >
                        <option value="">Selecione</option>
                        <option value="capacitacoes">Capacitações</option>
                        <option value="recebimentos">Recebimentos</option>
                        <option value="doacoes">Doações</option>
                        <option value="descartes">Descartes</option>

                    </select>
                </div>
            </form>
            <br />
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-green-600 bg-green-600  px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={() => handleGerar()}>Gerar</button>
        </ComponentCard>
    )
}