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

const FormWrapper = ({ ErrorMessage, values, setFieldValue }: DataProps) => {

    const [alunos, setAlunos] = useState([]);
    const [cursos, setCursos] = useState([]);

    async function getAlunos() {
        const response = await Api.get('alunos/options')
        setAlunos(response.data.data)
    }
   
    async function getCursos() {
        const response = await Api.get('cursos/options')
        console.log(response.data.data)
        setCursos(response.data.data)
    }

    useEffect(() => {
        getAlunos()
        getCursos()
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
                    <SelectInputs options={cursos} label="Curso" name="curso_id" id="curso_id" />
                    <span className="error">
                        <ErrorMessage name="curso_id" component="span" />
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
            searchFieldName='search'
            emptyObject={{
                aluno_id: '',
                curso_id: '',
                
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'aluno_id', label: 'Aluno' },
                { name: 'curso_id', label: 'Curso' },
            ]}
            validation={(Yup: object | any) => {
                return {
                    aluno_id: Yup.string().required('Campo obrigatório'),
                    curso_id: Yup.string().required('Campo obrigatório'),
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
