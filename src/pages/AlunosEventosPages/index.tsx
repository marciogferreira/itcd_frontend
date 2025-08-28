import Crud from '../../components/Crud';
import { ReactElement, useEffect, useState } from 'react';
import Label from '../../components/form/Label';
import Api from '../../config/Api';
import SelectInputs from '../../components/form/form-elements/SelectInputs';

type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage, values, setFieldValue }: DataProps) => {
    
    const [alunos, setAlunos] = useState([]);

    async function getAlunos() {
        const response = await Api.get('alunos/options')
        setAlunos(response.data.data)
    }

    useEffect(() => {
        getAlunos()
    }, []);

    const [evento, setEvento] = useState([]);

    async function getEvento() {
        const response = await Api.get('eventos-certificacoes/options')
        setEvento(response.data.data)
    }

    useEffect(() => {
        getEvento()
    }, []);

    return (
        <>
            <div className='row'>

                <div className='mb-3'>
                    <SelectInputs options={alunos} label="Aluno" name="aluno_id" id="aluno_id" />
                    <span className="error">
                        <ErrorMessage name="aluno_id" component="span" />
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">

                    <div className='mb-3'>
                        <SelectInputs options={evento} label="Evento" name="evento_id" id="evento_id" />
                        <span className="error">
                            <ErrorMessage name="evento" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Status Certificado</Label>
                        <select value={values.status_entrega} onChange={e => setFieldValue('status_entrega', e.target.value)} id="status_entrega" name="status_entrega" className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                            <option value="">Selecione</option>
                            <option value="presencial">Entregue</option>
                            <option value="distancia">Não entregue</option>
                            <option value="hibrido">Em confecção</option>
                        </select>
                        <span className="error">
                            <ErrorMessage name="status_entrega" component="span" />
                        </span>
                    </div>

                </div>
              
            </div>           
        </>
    );
}

export default function AlunosEventosPages() {
    return (
        <Crud
            title="Alunos Eventos"
            endPoint="alunos-eventos"
            searchFieldName='search'
            emptyObject={{
                aluno_id: '',
                evento_id: '',
                status_entrega: '',

                
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'aluno_id', label: 'Aluno' },
                { name: 'evento_id', label: 'Evento' },
                { name: 'status_entrega', label: 'Status Entrega' }
            ]}
            validation={(Yup: object | any) => {
                return {
                    aluno_id: Yup.string().required('Campo obrigatório'),
                    evento_id: Yup.string().required('Campo obrigatório'),
                    status_entrega:  Yup.string().required('Campo obrigatório'),
                };
            } }
            FormWrapper={FormWrapper} 
            columns={[]} 
            enableBtnNew={false} 
            saveContinueForm={false} 
            showActionsColumn={false} 
            showDeleteColumn={false} 
            showEditColumn={false} 
            showNewButton={false} 
            showSearch={false} 
            showPagination={false} 
            showSort={false}
            showTotal={false} 
            showViewHistory={false}
            showViewAlterStatus={false}        />
    );
}