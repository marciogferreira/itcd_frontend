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
                    <Label>Evento</Label>
                    <Input type="text" id="nome" name="nome" />
                    <span className="error">
                        <ErrorMessage name="nome" component="span" />
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">

                    <div className='mb-3'>
                        <Label>Data</Label>
                        <Input type="date" id="data" name="data" />
                        <span className="error">
                            <ErrorMessage name="carga_horaria" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Tipo</Label>
                        <select value={values.tipo} onChange={e => setFieldValue('tipo', e.target.value)} id="tipo" name="tipo" className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                            <option value="">Selecione</option>
                            <option value="presencial">Presencial</option>
                            <option value="online">Online</option>
                            <option value="email">E-mail</option>
                            <option value="correio">Correio</option>
                        </select>
                        <span className="error">
                            <ErrorMessage name="tipo" component="span" />
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
                        <Label>Reponsável</Label>
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

export default function EventosPages() {
    return (
        <Crud
            title="Eventos"
            endPoint="eventos"
            searchFieldName='search'
            desc="Cadastro de eventos"
            emptyObject={{
                nome: '',
                data: '',
                tipo: '',
                localizacao: '',
                responsavel: '',
                documentacao: '',
                
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome', label: 'Nome' },
                { name: 'data', label: 'Data' },
                { name: 'localizacao', label: 'Localização' },
                { name: 'responsavel', label: 'Responsável' },
            ]}
            validation={(Yup: object | any) => {
                return {
                    nome: Yup.string().required('Campo obrigatório'),
                    data: Yup.string().required('Campo obrigatório'),
                    tipo:  Yup.string().required('Campo obrigatório'),
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
