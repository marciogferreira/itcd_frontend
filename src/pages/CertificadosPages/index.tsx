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

const FormWrapper = ({ ErrorMessage }: DataProps) => {

    const [matriculas, setMatriculas] = useState([]);


    async function getMatriculas() {
        const response = await Api.get('matriculas/options')
        setMatriculas(response.data.data)
    }

    useEffect(() => {
        getMatriculas()
    }, []);



    return (
        <>
            <div className='row'>

                <div className='mb-3'>
                    <SelectInputs options={matriculas} label="Matricula" name="matricula_id" id="matricula_id" />
                    <span className="error">
                        <ErrorMessage name="matricula" component="span" />
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">

                    <div className='mb-3'>
                        <Label>Data de Emissão</Label>
                        <Input type="date" id="data_emissao" name="data_emissao" />
                        <span className="error">
                            <ErrorMessage name="data_emissao" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Codigo de Verificação</Label>
                        <Input type="text" id="codigo_verificacao" name="codigo_verificacao" />
                        <span className="error">
                            <ErrorMessage name="codigo_verificacao" component="span" />
                        </span>
                    </div>

                </div>


            </div>
        </>
    );
}
export default function CertificadosPages() {
    return (
        <Crud
            title="Certificados"
            endPoint="certificados"
            searchFieldName='search'
            emptyObject={{
                matricula_id: '',
                data_emissao: '',
                codigo_verificacao: '',
                arquivo_certificado: '',

            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'matricula_id', label: 'Nome' },
                { name: 'data_emissao', label: 'Data de Emissão' },
            ]}
            validation={(Yup: object | any) => {
                return {
                    matricula_id: Yup.string().required('Campo obrigatório'),
                    data_emissao: Yup.string().required('Campo obrigatório'),
                    codigo_verificacao: Yup.string().required('Campo obrigatório'),

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
            showViewAlterStatus={false} />
    );
}
