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

const FormWrapper = ({ ErrorMessage}: DataProps) => {
    
    const [doacoes, setDoacoes] = useState([]);

   
    async function getDoacoes() {
        const response = await Api.get('doacoes/options')
        console.log(response.data.data)
        setDoacoes(response.data.data)
    }

    useEffect(() => {
        getDoacoes()
    }, []);

    

    return (
        <>
            <div className='row'>
                

                <div className='mb-3'>
                    <SelectInputs options={doacoes} label="Nome do Doador" name="doador_id" id="doador_id" />
                    <span className="error">
                        <ErrorMessage name="doador_id" component="span" />
                    </span>
                </div>
              
            </div>           
        </>
    );
}

export default function TurmasPages() {
    return (
        <Crud
            title="Doações"
            endPoint="doacoes"
            searchFieldName='search'
            desc="Cadastro de Doações"
            emptyObject={{
                doador_id: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'doador_id', label: 'Doador' },
            ]}
            fieldsHtml={({ item }: any) => (
                <>
                    <td>{item.id}</td>
                    <td>
                        {item.doador.nome}
                    </td>
                </>
            )}
            validation={(Yup: object | any) => {
                return {
                    doador_id: Yup.string().required('Campo obrigatório'),
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
