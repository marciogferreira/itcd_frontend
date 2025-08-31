import Crud from '../../components/Crud';
import { ReactElement } from 'react';
// import Api from '../../config/Api';
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
    
    const roles = [
        { label: 'SuperAdmin', value: '1' },
        { label: 'Administrador', value: '2' },
        { label: 'Operador', value: '3' },
        { label: 'Aluno', value: '4' },
    ];
   
    return (
        <>
            <div className='row'>
                
                <div className="md:flex justify-between gap-4">
                    <div className='mb-3 md:w-[50%]'>
                        <Label>Nome</Label>
                        <Input type="text" id="name" name="name" />
                        <span className="error">
                            <ErrorMessage name="name" component="span" />
                        </span>
                    </div>

                    <div className='mb-3 md:w-[50%]'>
                        <Label>E-mail</Label>
                        <Input type="text" id="email" name="email" />
                        <span className="error">
                            <ErrorMessage name="email" component="span" />
                        </span>
                    </div>
                </div>

                <div className="md:flex justify-between gap-4">
                    <div className='mb-3 md:w-[50%]'>
                        <Label>Senha</Label>
                        <Input type="password" id="password" name="password" />
                        <span className="error">
                            <ErrorMessage name="password" component="span" />
                        </span>
                    </div>
                    <div className='mb-3 md:w-[50%]'>
                        <Label>Confirmar Senha</Label>
                        <Input type="password" id="confirm_password" name="confirm_password" />
                        <span className="error">
                            <ErrorMessage name="confirm_password" component="span" />
                        </span>
                    </div>
                </div>

                <div className='mb-3'>
                    <SelectInputs options={roles} label="Perfil" name="role" id="role" />
                    <span className="error">
                        <ErrorMessage name="role" component="span" />
                    </span>
                </div>
            
            </div>           
        </>
    );
}

export default function UsuariosPages() {
    return (
        <Crud
            title="Usuários"
            endPoint="usuarios"
            searchFieldName='search'
            desc="Cadastro de Usuários"
            emptyObject={{
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                role: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'name', label: 'Nome' },
                { name: 'email', label: 'E-mail' },
            ]}
            fieldsHtml={({ item }: any) => (
                <>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                </>
            )}
            validation={(Yup: object | any) => {
                return {
                    name: Yup.string().required('Campo obrigatório'),
                    email: Yup.string().required('Campo obrigatório').email("E-mail inválido"),
                    password: Yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter ao menos 6 caracteres'),
                    confirm_password: Yup.string().required('Confirme a senha').oneOf([Yup.ref('password')], 'As senhas não coincidem'),
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
