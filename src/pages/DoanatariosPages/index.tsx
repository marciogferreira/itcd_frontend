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
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="mb-3">
                            <Label>Nome do Diretor</Label>
                            <Input type="text" id="nome_diretor" name="nome_diretor" />
                            <span className="error">
                                <ErrorMessage name="nome_diretor" component="span" />
                            </span>
                        </div>

                        <div className="mb-3">
                            <Label>Contato do Diretor</Label>
                            <Input type="text" id="contato_diretor" name="contato_diretor" />
                            <span className="error">
                                <ErrorMessage name="contato_diretor" component="span" />
                            </span>
                        </div>

                        <div className="mb-3">
                            <Label>Quantidade</Label>
                            <Input type="number" id="quantidade" name="quantidade" />
                            <span className="error">
                                <ErrorMessage name="quantidade" component="span" />
                            </span>
                        </div>
                    </div>

                    <div className="mb-3">
                    <Label>Termo de Doação</Label>
                    <Input type="text" id="termo_doacao" name="termo_doacao" />
                    <span className="error">
                        <ErrorMessage name="termo_doacao" component="span" />
                    </span>
                    </div>

                    <div className="mb-3">
                    <Label>Data da Entrega</Label>
                    <Input type="date" id="data_entrega" name="data_entrega" />
                    <span className="error">
                        <ErrorMessage name="data_entrega" component="span" />
                    </span>
                    </div>

            </div>           
        </>
    );
}

export default function DonatariosPages() {
    return (
        <Crud
            title="Donatários"
            endPoint="donatarios"
            searchFieldName='search'
            desc="Cadastro de Donatários"
            emptyObject={{
                nome_diretor: '',
                contato_diretor: '',
                quantidade: '',
                termo_doacao: '',
                data_entrega: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome_diretor', label: 'Nome do Diretor' },
                { name: 'contato_diretor', label: 'Contato' },
                { name: 'quantidade', label: 'Quantidade' },
                { name: 'data_entrega', label: 'Data de Entrega' },
            ]}
           
            validation={(Yup: object | any) => {
                return {
                    nome_diretor: Yup.string().required('Campo obrigatório'),
                    contato_diretor: Yup.string().required('Campo obrigatório'),
                    quantidade: Yup.string().required('Campo obrigatório'),
                    termo_doacao: Yup.string().required('Campo obrigatório'),
                    data_entrega: Yup.string().required('Campo obrigatório'),
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
