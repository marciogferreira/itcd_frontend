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
                            <Label>Tipo de Resíduo</Label>
                            <Input type="text" id="tipo_residuo" name="tipo_residuo" />
                            <span className="error">
                                <ErrorMessage name="tipo_residuo" component="span" />
                            </span>
                        </div>

                        <div className="mb-3">
                            <Label>Peso Total (kg)</Label>
                            <Input type="number"  id="peso_total" name="peso_total" />
                            <span className="error">
                                <ErrorMessage name="peso_total" component="span" />
                            </span>
                        </div>

                        <div className="mb-3">
                            <Label>Origem</Label>
                            <Input type="text" id="origem" name="origem" />
                            <span className="error">
                                <ErrorMessage name="origem" component="span" />
                            </span>
                        </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="mb-3">
                        <Label>Data da Destinação</Label>
                        <Input type="date" id="data_destinacao" name="data_destinacao" />
                        <span className="error">
                            <ErrorMessage name="data_destinacao" component="span" />
                        </span>
                    </div>

                    <div className="mb-3">
                        <Label>Destinatário</Label>
                        <Input type="text" id="destinatario" name="destinatario" />
                        <span className="error">
                            <ErrorMessage name="destinatario" component="span" />
                        </span>
                    </div>

                    <div className="mb-3">
                        <Label>Peso do Material Descartado (kg)</Label>
                        <Input type="number" id="peso_descartado" name="peso_descartado" />
                        <span className="error">
                            <ErrorMessage name="peso_descartado" component="span" />
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="mb-3">
                        <Label>Termo de Descartes</Label>
                        <Input type="file" id="recibo_digitalizado" name="recibo_digitalizado" />
                        <span className="error">
                            <ErrorMessage name="recibo_digitalizado" component="span" />
                        </span>
                    </div>

                    <div className="mb-3">
                        <Label>Responsável pela Entrega</Label>
                        <Input type="text" id="responsavel_entrega" name="responsavel_entrega" />
                        <span className="error">
                            <ErrorMessage name="responsavel_entrega" component="span" />
                        </span>
                    </div>
                </div>

               
            </div>           
        </>
    );
}

export default function DescartesPages() {
    return (
        <Crud
            title="Descartes"
            endPoint="descartes"
            searchFieldName='search'
            desc="Cadastro de Descartes"
            emptyObject={{
                tipo_residuo: '',
                peso_total: '',
                origem: '',
                data_destinacao: '',
                destinatario: '',
                peso_descartado: '',
                recibo_digitalizado: '',
                responsavel_entrega: ''
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'tipo_residuo', label: 'Residuo' },
                { name: 'peso_total', label: 'Peso Total' },
                { name: 'origem', label: 'Origem' },
            ]}
           
            validation={(Yup: object | any) => {
                return {
                    tipo_residuo: Yup.string().required('Campo obrigatório'),
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
