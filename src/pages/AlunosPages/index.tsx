import Crud from '../../components/Crud';
import { ReactElement } from 'react';
import Label from '../../components/form/Label';
import Input, { InputCustom } from '../../components/form/input/InputField';
import SelectInputs from '../../components/form/form-elements/SelectInputs';
import Util from '../../config/Util';


type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage, values, setFieldValue }: DataProps) => {
    return (
        <>
            <div className='row'>
                <div className='mb-3'>
                    <Label>Nome</Label>
                    <Input type="text" id="nome" name="nome" />
                    <span className="error">
                        <ErrorMessage name="nome" component="span" />
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className='mb-3'>
                        <Label>CPF</Label>
                        <Input type="text" id="cpf" name="cpf" />
                        <span className="error">
                            <ErrorMessage name="cpf" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Data de Nascimento</Label>
                        <Input type="date" id="data_nascimento" name="data_nascimento" />
                        <span className="error">
                            <ErrorMessage name="data_nascimento" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Gênero</Label>
                        <select
                          value={values.genero}
                          onChange={e => setFieldValue('genero', e.target.value)}
                          id="genero"
                          name="genero"
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                        >
                            <option value="">Selecione</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                        </select>
                        <span className="error">
                            <ErrorMessage name="genero" component="span" />
                        </span>
                    </div>
                </div>

                <br />
                <div className="grid md:grid-cols-3 gap-4">
                    <div className='mb-3'>
                        <Label>Telefone</Label>
                        <Input type="text" id="telefone" name="telefone" />
                        <span className="error">
                            <ErrorMessage name="telefone" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Email</Label>
                        <Input type="email" id="email" name="email" />
                        <span className="error">
                            <ErrorMessage name="email" component="span" />
                        </span>
                    </div>

                    {/* <div className='mb-3'>
                        <Label>Data de Cadastro</Label>
                        <Input type="date" id="data_cadastro" name="data_cadastro" />
                        <span className="error">
                            <ErrorMessage name="data_cadastro" component="span" />
                        </span>
                    </div> */}
                </div>

                <br />
                <div className="grid md:grid-cols-3 gap-4">

                    <div className='mb-3'>
                        <SelectInputs options={Util.tiposLogradouros()} label="Tipo Logradouro" name="tipo_logradouro" id="tipo_logradouro" />
                        <span className="error">
                            <ErrorMessage name="tipo_logradouro" component="span" />
                        </span>
                    </div>
                    
                    <div className='mb-3'>
                        <Label>Logradouro</Label>
                        <Input type="text" id="logradouro" name="logradouro" />
                        <span className="error">
                            <ErrorMessage name="logradouro" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Número</Label>
                        <Input type="text" id="numero" name="numero" />
                        <span className="error">
                            <ErrorMessage name="numero" component="span" />
                        </span>
                    </div>
                </div>

                <br />
                <div className="grid md:grid-cols-3 gap-4">
                    <div className='mb-3'>
                        <Label>Estado</Label>
                        <Input type="text" id="estado" name="estado" />
                        <span className="error">
                            <ErrorMessage name="estado" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Cidade</Label>
                        <Input type="text" id="cidade" name="cidade" />
                        <span className="error">
                            <ErrorMessage name="cidade" component="span" />
                        </span>
                    </div>
                </div>
            </div>           
        </>
    );
}

export default function AlunosPages() {

    // const cpfValido = /^(\d{3}\.\d{3}\.\d{3}-\d{2})$/;
    const cpfValido = /^(\d{11})$/;
    const telefoneValido = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    return (
        <Crud
            title="Alunos"
            endPoint="alunos"
            searchFieldName='search'
            desc="Cadastro de Alunos"
            emptyObject={{
                nome: '',
                cpf: '',
                data_nascimento: '',
                genero: '',
                tipo_logradouro: '',
                logradouro: '',
                numero: '',
                estado: '',
                cidade: '',
                telefone: '',
                email: '',
                // data_cadastro: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome', label: 'Nome' },
                { name: 'cpf', label: 'CPF' },
                { name: 'telefone', label: 'Telefone' },
                { name: 'email', label: 'Email' }
            ]}
            FormSearch={({ params, setParams }: any) => (
                <>
                    <InputCustom 
                        placeholder='Filtrar por Nome' 
                        type="text" id="nome" name="nome" 
                        onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                    
                    <div className="flex gap-5">
                        <div className='w-[50%]'>
                            <InputCustom 
                            placeholder='Filtrar por CPF' 
                            type="text" id="cpf" name="cpf" 
                            onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                        </div>
                        <div className='w-[50%]'>
                            <InputCustom 
                            placeholder='Filtrar por E-mail' 
                            type="text" id="email" name="email" 
                            onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                        </div>
                    </div>
                </>
            )}
            validation={(Yup: object | any) => {
                return {
                    nome: Yup.string().required('Campo obrigatório'),
                    cpf: Yup.string().required('Campo obrigatório').matches(cpfValido, 'CPF inválido'),
                    data_nascimento: Yup.string().required('Campo obrigatório'),
                    genero: Yup.string().required('Campo obrigatório'),
                    tipo_logradouro: Yup.string().required('Campo obrigatório'),
                    logradouro: Yup.string().required('Campo obrigatório'),
                    numero: Yup.string().required('Campo obrigatório'),
                    estado: Yup.string().required('Campo obrigatório'),
                    cidade: Yup.string().required('Campo obrigatório'),
                    telefone: Yup.string().required('Campo obrigatório').matches(telefoneValido, 'Telefone inválido'),
                    email: Yup.string().required('Campo obrigatório').email('E-mail inválido')
                    // data_cadastro: Yup.string().required('Campo obrigatório'),
                };
            }}
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
            showViewAlterStatus={false}        
        />
    );
}
