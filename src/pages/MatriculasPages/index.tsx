import Crud from '../../components/Crud';
import { ReactElement, useEffect, useState } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
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

    return (
        <>
            <div className='row'>

                <div className='mb-3'>
                    <SelectInputs options={alunos} label="Aluno" name="aluno_id" id="aluno_id" />
                    <span className="error">
                        <ErrorMessage name="aluno_id" component="span" />
                    </span>
                </div>

                <div className='mb-3'>
                    <Label>Nome do Curso</Label>
                    <Input type="text" id="nome_curso" name="nome_curso" />
                    <span className="error">
                        <ErrorMessage name="nome_curso" component="span" />
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">

                    <div className='mb-3'>
                        <Label>Carga Horária</Label>
                        <Input type="text" id="carga_horaria" name="carga_horaria" />
                        <span className="error">
                            <ErrorMessage name="carga_horaria" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Descrição</Label>
                        <Input type="text" id="descricao" name="descricao" />
                        <span className="error">
                            <ErrorMessage name="descricao" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Modalidade</Label>
                        <select value={values.modalidade} onChange={e => setFieldValue('modalidade', e.target.value)} id="modalidade" name="modalidade" className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                            <option value="">Selecione</option>
                            <option value="Presencial">Presencial</option>
                            <option value="EAD">EAD</option>
                            <option value="Hibrido">Híbrido</option>
                        </select>
                        
                        <span className="error">
                            <ErrorMessage name="modalidade" component="span" />
                        </span>
                    </div>

                </div>

                <br />
                <div className="grid md:grid-cols-3 gap-4">
                    <div className='mb-3'>
                        <Label>Status</Label>
                        <select value={values.status} onChange={e => setFieldValue('status', e.target.value)} id="status" name="status" className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                            <option value="">Selecione</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                       </select>
                        <span className="error">
                            <ErrorMessage name="status" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Link</Label>
                        <Input type="text" id="link" name="link" />
                        <span className="error">
                            <ErrorMessage name="link" component="span" />
                        </span>
                    </div>

                </div>
               
            </div>           
        </>
    );
}

export default function MatriculasPages() {
    return (
        <Crud
            title="Matrículas"
            endPoint="matriculas"
            searchFieldName='search'
            emptyObject={{
                nome_curso: '',
                carga_horaria: '',
                descricao: '',
                modalidade: '',
                status: '',
                link: '',
                
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome_curso', label: 'Curso' },
                { name: 'carga_horaria', label: 'Carga horária' },
                { name: 'descricao', label: 'Descrição' }
            ]}
            validation={(Yup: object | any) => {
                return {
                    nome_curso: Yup.string().required('Campo obrigatório'),
                    carga_horaria: Yup.string().required('Campo obrigatório'),
                    descricao:  Yup.string().required('Campo obrigatório'),
                    modalidade:  Yup.string().required('Campo obrigatório'),
                    status:  Yup.string().required('Campo obrigatório'),
                    link:  Yup.string().required('Campo obrigatório'),

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
