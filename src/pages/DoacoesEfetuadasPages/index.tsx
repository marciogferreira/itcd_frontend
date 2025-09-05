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
                    <Label>Nome do Doador</Label>
                    <Input type="text" id="nome" name="nome" />
                    <span className="error">
                        <ErrorMessage name="nome" component="span" />
                    </span>
                </div>
               
            </div>           
        </>
    );
}

export default function DoacoesEfetuadasPages() {
    return (
        <Crud
            title="Doações Efetuadas"
            endPoint="doacoes-efetuadas"
            searchFieldName='search'
            desc="Cadastro de Doações Efetuadas"
            emptyObject={{
                nome: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome', label: 'Doador' },
            ]}
           
            validation={(Yup: object | any) => {
                return {
                    nome: Yup.string().required('Campo obrigatório'),

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
