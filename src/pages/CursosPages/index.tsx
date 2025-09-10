import Crud from '../../components/Crud';
import { ReactElement } from 'react';
import Label from '../../components/form/Label';
import Input, { InputCustom } from '../../components/form/input/InputField';

type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage, values, Field, setFieldValue }: DataProps) => {
    return (
        <>
            <div className='row'>
                <div className='mb-3'>
                    <Label>Nome do Curso</Label>
                    <Input type="text" id="nome" name="nome" />
                    <span className="error">
                        <ErrorMessage name="nome" component="span" />
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

                </div>

                <br />
                <div className="grid md:grid-cols-1 gap-4">
                    <div className='mb-3'>
                        <Label>Link</Label>
                        <Input type="text" id="link" name="link" />
                        <span className="error">
                            <ErrorMessage name="link" component="span" />
                        </span>
                    </div>
                </div>

                  <div className='mb-3'>
                    <Label>Descrição</Label>
                    <Field as={'textarea'} className="p-4 rounded-md w-full border-2 border-gray-200" rows="5" type="text" id="descricao" name="descricao" />
                    <span className="error">
                        <ErrorMessage name="descricao" component="span" />
                    </span>
                </div>
               
            </div>           
        </>
    );
}

export default function CursosPages() {
    return (
        <Crud
            title="Cursos"
            endPoint="cursos"
            searchFieldName='search'
            desc="Cadastro de Cursos"
            emptyObject={{
                nome: '',
                carga_horaria: '',
                descricao: '',
                modalidade: '',
                status: '',
                link: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome', label: 'Curso' },
                { name: 'carga_horaria', label: 'Carga horária' },
                { name: 'descricao', label: 'Descrição' }
            ]}
           FormSearch={({ params, setParams }: any) => (
                <>
                    <InputCustom
                        placeholder='Filtrar por Curso' 
                        type="text" id="nome" name="nome" 
                        onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                    
                    <div className="flex gap-5">
                        <div className='w-[50%]'>
                            <InputCustom 
                            placeholder='Filtrar por Carga Horária' 
                            type="text" id="carga_horaria" name="carga_horaria" 
                            onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                        </div>
                        <div className='w-[50%]'>
                            <InputCustom 
                            placeholder='Filtrar por Descrição' 
                            type="text" id="descricao" name="descricao" 
                            onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                        </div>
                    </div>
                </>
            )}
            validation={(Yup: object | any) => {
                return {
                    nome: Yup.string().required('Campo obrigatório'),
                    carga_horaria: Yup.string().required('Campo obrigatório'),
                    descricao:  Yup.string().required('Campo obrigatório'),
                    modalidade:  Yup.string().required('Campo obrigatório'),
                    status:  Yup.string().required('Campo obrigatório'),
                    link:  Yup.string().required('Campo obrigatório').url("URL Inválida"),

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
