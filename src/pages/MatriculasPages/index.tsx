import Crud from '../../components/Crud';
import { ReactElement, useEffect, useState } from 'react';
import Api from '../../config/Api';
import SelectInputs from '../../components/form/form-elements/SelectInputs';

type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage}: DataProps) => {

    const [alunos, setAlunos] = useState([]);
    const [turma, setTurmas] = useState([]);

    async function getAlunos() {
        const response = await Api.get('alunos/options')
        setAlunos(response.data.data)
    }
   
    async function getTurmas() {
        const response = await Api.get('cursos/options')
        console.log(response.data.data)
        setTurmas(response.data.data)
    }

    useEffect(() => {
        getAlunos()
        getTurmas()
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
                    <SelectInputs options={turma} label="Turma" name="turma_id" id="turma_id" />
                    <span className="error">
                        <ErrorMessage name="turma_id" component="span" />
                    </span>
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
            desc="Cadastro de Matrículas"
            searchFieldName='search'
            emptyObject={{
                aluno_id: '',
                turma_id: '',
                
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'aluno_id', label: 'Aluno' },
                { name: 'turma_id', label: 'Turma' },
                { name: 'turma_id', label: 'Certificado' },
            ]}
              fieldsHtml={({ item }: any) => (
                <>
                    <td>{item.id}</td>
                    <td>{item.aluno_id}</td>
                    <td>
                        {item.turma_id}
                    </td>
                    <td>
                        <button className='p-2 bg-gray-500'>Gerar Certificado</button>
                    </td>
                </>
            )}
            validation={(Yup: object | any) => {
                return {
                    aluno_id: Yup.string().required('Campo obrigatório'),
                    turma_id: Yup.string().required('Campo obrigatório'),
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
