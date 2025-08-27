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
                    <Label>Nome do Evento</Label>
                    <Input type="text" id="nome_evento" name="nome_evento" />
                    <span className="error">
                        <ErrorMessage name="nome_evento" component="span" />
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">

                    <div className='mb-3'>
                        <Label>Data do Evento</Label>
                        <Input type="date" id="data_evento" name="data_evento" />
                        <span className="error">
                            <ErrorMessage name="data_evento" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Tipo de Evento</Label>
                        <Input type="text" id="tipo_evento" name="tipo_evento" />
                        <span className="error">
                            <ErrorMessage name="tipo_evento" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Localização</Label>
                        <Input type="text" id="localizacao" name="localizacao" />
                        <span className="error">
                            <ErrorMessage name="localizacao" component="span" />
                        </span>
                    </div>

                </div>

                <br />
                <div className="grid md:grid-cols-3 gap-4">
                    <div className='mb-3'>
                        <Label>Responsável</Label>
                        <Input type="text" id="responsavel" name="responsavel" />
                        <span className="error">
                            <ErrorMessage name="responsavel" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Documentação</Label>
                        <Input type="text" id="documentacao" name="documentacao" />
                        <span className="error">
                            <ErrorMessage name="documentacao" component="span" />
                        </span>
                    </div>

                </div>
              
            </div>           
        </>
    );
}

export default function EventosCertificacoesPages() {
    return (
        <Crud
            title="Eventos Certificacao"
            endPoint="eventos_certificacao"
            searchFieldName='search'
            emptyObject={{
                nome_evento: '',
                data_evento: '',
                tipo_evento: '',
                localizacao: '',
                responsavel: '',
                documentacao: '',
                
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome_evento', label: 'Evento' },
                { name: 'data_evento', label: 'Data do Evento' },
                { name: 'responsavel', label: 'Responsavel' }
            ]}
            validation={(Yup: object | any) => {
                return {
                    nome_evento: Yup.string().required('Campo obrigatório'),
                    data_evento: Yup.string().required('Campo obrigatório'),
                    tipo_evento:  Yup.string().required('Campo obrigatório'),
                    localizacao:  Yup.string().required('Campo obrigatório'),
                    responsavel:  Yup.string().required('Campo obrigatório'),
                    documentacao:  Yup.string().required('Campo obrigatório'),

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
