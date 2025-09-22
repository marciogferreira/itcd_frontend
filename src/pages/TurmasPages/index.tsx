import Crud from '../../components/Crud';
import { ReactElement } from 'react';
import SelectInputs, { SelectInputsCustom } from '../../components/form/form-elements/SelectInputs';
import Label from '../../components/form/Label';
import Input, { InputCustom } from '../../components/form/input/InputField';
import { useOptions } from '../../hooks/useApi';

type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage}: DataProps) => {

    const { data: cursos } = useOptions('cursos');   
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
            FormSearch={({ params, setParams }: any) => {
                const { data: cursos } = useOptions('cursos')
                return (
                    <>
                        <div className="flex gap-5">
                            <div className='w-[50%]'>
                                <div className='mb-3'>
                                    <Label>Nome</Label>
                                    <InputCustom 
                                        placeholder='Filtrar por Nome' 
                                        type="text" id="nome" name="nome" 
                                        onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                                </div>
                            </div>
                            <div className='w-[50%]'>
                                <div className='mb-3'>
                                    <SelectInputsCustom 
                                        placeholder="Selecione"
                                        onchange={(value: any) => setParams({...params, curso_id: value})} 
                                        value={params.curso_id} options={cursos} label="Curso" name="curso_id" id="curso_id" 
                                    />
                                </div>
                            </div>
                            <div className='w-[50%]'>
                              
                            </div>
                        </div>
                    </>
                )
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
