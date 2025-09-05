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

const FormWrapper = ({ ErrorMessage }: DataProps) => {
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
                        <Label>E-mail</Label>
                        <Input type="email" id="email" name="email" />
                        <span className="error">
                            <ErrorMessage name="email" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Observação</Label>
                        <Input type="text" id="observacao" name="observacao" />
                        <span className="error">
                            <ErrorMessage name="observacao" component="span" />
                        </span>
                    </div>

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
                email: '',
                observacao: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome', label: 'Nome' },
                { name: 'email', label: 'E-mail' },
                { name: 'observacao', label: 'Observacao' }
            ]}
           
            validation={(Yup: object | any) => {
                return {
                    nome: Yup.string().required('Campo obrigatório'),
                    email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
                    observacao:  Yup.string().required('Campo obrigatório')
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
