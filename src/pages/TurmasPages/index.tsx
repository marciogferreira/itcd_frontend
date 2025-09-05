import Crud from '../../components/Crud';
import { ReactElement, useEffect, useState } from 'react';
import Api from '../../config/Api';
import SelectInputs from '../../components/form/form-elements/SelectInputs';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';

type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage}: DataProps) => {
    
    const [cursos, setCursos] = useState([]);

   
    async function getCursos() {
        const response = await Api.get('cursos/options')
        console.log(response.data.data)
        setCursos(response.data.data)
    }

    useEffect(() => {
        getCursos()
    }, []);

    

    return (
        <>
            <div className='row'>
                
                <div className='mb-3'>
                    <Label>Nome da Turma</Label>
                    <Input type="text" id="nome" name="nome" />
                    <span className="error">
                        <ErrorMessage name="nome" component="span" />
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

export default function TurmasPages() {
    return (
        <Crud
            title="Turmas"
            endPoint="turmas"
            searchFieldName='search'
            desc="Cadastro de Turmas"
            emptyObject={{
                nome: '',
                curso_id: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome', label: 'Turma' },
                { name: 'curso_id', label: 'Curso' },
            ]}
            fieldsHtml={({ item }: any) => (
                <>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>
                        {item.curso.nome}
                    </td>
                </>
            )}
            validation={(Yup: object | any) => {
                return {
                    nome: Yup.string().required('Campo obrigatório'),
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
