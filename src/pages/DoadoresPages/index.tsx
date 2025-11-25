import Crud from '../../components/Crud';
import { ReactElement } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';

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

                <div className="grid md:grid-cols-2 gap-4">

                    <div className='mb-3'>
                        <Label>Responsável</Label>
                        <Input type="text" id="responsavel" name="responsavel" />
                        <span className="error">
                            <ErrorMessage name="responsavel" component="span" />
                        </span>
                    </div>
                    <div className='mb-3'>
                        <Label>E-mail</Label>
                        <Input type="email" id="email" name="email" />
                        <span className="error">
                            <ErrorMessage name="email" component="span" />
                        </span>
                    </div>
                </div>  
                
                <div className='mb-3'>
                        <Label>Observação</Label>
                        <textarea 
                            onChange={e => setFieldValue('observacao', e.target.value)}
                            id="observacao" 
                            name="observacao" 
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden">{values.observacao}</textarea>
                        <span className="error">
                            <ErrorMessage name="observacao" component="span" />
                        </span>
                    </div>
            </div>           
        </>
    );
}

export default function CursosPages() {
    return (
        <Crud
            title="Doadores"
            endPoint="doadores"
            searchFieldName='search'
            desc="Cadastro de Doadores"
            emptyObject={{
                nome: '',
                responsavel: '',
                email: '',
                observacao: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome', label: 'Nome' },
                { name: 'responsavel', label: 'Responsável' },
                { name: 'email', label: 'E-mail' }
            ]}
            
            validation={(Yup: object | any) => {
                return {
                    nome: Yup.string().required('Campo obrigatório'),
                    responsavel: Yup.string().required('Campo obrigatório')
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
