import Crud from '../../components/Crud';
import { ReactElement, useEffect, useState } from 'react';
import Api from '../../config/Api';
import SelectInputs from '../../components/form/form-elements/SelectInputs';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import { Card } from 'react-bootstrap';

type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage, values }: DataProps) => {
    
    const [doadores, setDoadores] = useState([]);
   
    async function getDoadores() {
        const response = await Api.get('doadores/options')
        setDoadores(response.data.data)
    }

    useEffect(() => {
        getDoadores()
    }, []);  

    return (
        <>
            <div className='row'>
                <div className='mb-3'>
                    <SelectInputs options={doadores} label="Selecione o Doador" name="doador_id" id="doador_id" />
                    <span className="error">
                        <ErrorMessage name="doador_id" component="span" />
                    </span>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    <div className='mb-3'>
                        <Label>Data de Recebimento</Label>
                        <Input type="date" id="data_recebimento" name="data_recebimento" />
                        <span className="error">
                            <ErrorMessage name="data_recebimento" component="span" />
                        </span>
                    </div>

                      <div className='mb-3'>
                        <Label>Peso dos Equipamentos</Label>
                        <Input type="number" id="peso" name="peso" />
                        <span className="error">
                            <ErrorMessage name="peso" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Quantidade de Equipamentos</Label>
                        <Input type="number" id="quantidade_equipamentos" name="quantidade_equipamentos" />
                        <span className="error">
                            <ErrorMessage name="quantidade_equipamentos" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                       
                       <SelectInputs 
                            options={[
                                { label: "Desktop", value: 'Desktop'  },
                                { label: "NoteBooks", value: 'NoteBooks'  },
                                { label: "Tablets", value: 'tablets'  },
                                { label: "Celulares", value: 'celulares'  },
                                { }
                            ]} 
                            label="Tipos de Equipamentos" 
                            name="tipos_equipamentos"
                            id="tipos_equipamentos" 
                        />
                        <span className="error">
                            <ErrorMessage name="tipos_equipamentos" component="span" />
                        </span>
                    </div>
                </div>
                <br />          
                <hr />
                <br /><br />
                
                    <Card.Body>
                        <h3 className='text-amber-800'>Processamento de Lotes</h3>
                        <hr /><br />
                    </Card.Body>

                    <div className="grid md:grid-cols-3 gap-4">
                        
                        <div className='mb-3'>
                            <Label>Responsável do Recebimento</Label>
                            <Input type="integer" id="responsavel_recebimento" name="responsavel_recebimento" />
                            <span className="error">
                                <ErrorMessage name="responsavel_recebimento" component="span" />
                            </span>
                        </div>


                        
                        <div className='mb-3'>
                            <Label>Quantidade de Aprovados</Label>
                            <Input type="integer" id="quantidade_aprovados" name="quantidade_aprovados" />
                            <span className="error">
                                <ErrorMessage name="quantidade_aprovados" component="span" />
                            </span>
                        </div>

                        <div className='mb-3'>
                            <Label>Quantidade de Rejeitados</Label>
                            <Input type="integer" id="quantidade_rejeitados" name="quantidade_rejeitados" />
                            <span className="error">
                                <ErrorMessage name="quantidade_rejeitados" component="span" />
                            </span>
                        </div>

                    </div>

                    <div className='mb-3'>
                        <Label>Observacoes Técnicas</Label>
                        <Input type="integer" id="observacoes_tecnicas" name="observacoes_tecnicas" />
                        <span className="error">
                            <ErrorMessage name="observacoes_tecnicas" component="span" />
                        </span>
                    </div>
                {values.id && 
                    <>
                    <Card.Body>
                        <h3 className='text-amber-800'>Equipamentos Recondicionados</h3>
                        <hr /><br />
                    </Card.Body>

                    <div className="grid md:grid-cols-3 gap-4">
                        
                        <div className='mb-3'>
                        <SelectInputs 
                                options={[
                                    { label: "Recondicionado", value: 'recondicionado'  },
                                    { label: "Descartado", value: 'descartado'  },
                                    { label: "Aguardando Peças", value: 'aguardando_pecas'  }
                                ]} 
                                label="Status" 
                                name="status"
                                id="status" 
                            />
                            <span className="error">
                                <ErrorMessage name="status" component="span" />
                            </span>
                        </div>

                        <div className='mb-3'>
                            <Label>Data de Finalização</Label>
                            <Input type="date" id="data_finalizacao" name="data_finalizacao" />
                            <span className="error">
                                <ErrorMessage name="data_finalizacao" component="span" />
                            </span>
                        </div>

                    </div>

                </>

                }                

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
                data_recebimento: '',
                peso: '',
                quantidade_equipamentos: 0,
                tipos: '',
                responsavel_recebimento: '',
                
                quantidade_aprovados: '',
                quantidade_rejeitados: '',
                observacoes_tecnicas: '',

                status: '',
                data_finalizacao: ''
            }}
            validation={(Yup: object | any) => {
                return {
                    doador_id: Yup.string().required('Campo obrigatório'),
                    data_recebimento: Yup.string().required('Campo obrigatório'),
                    quantidade_equipamentos: Yup.string().required('Campo obrigatório'),
                    responsavel_recebimento: Yup.string().required('Campo obrigatório'),
                };
            } }
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'doador_id', label: 'Doador' },
                { name: 'quantidade_equipamentos', label: 'Peso. Equipamentos' },
                { name: 'quantidade_equipamentos', label: 'Qtde. Equipamentos' },
                { name: 'quantidade_aprovados', label: 'quantidade_aprovados.' },
                { name: 'quantidade_equipamentos', label: 'Qtde. Equi. Rejeitados.' },
                { name: 'responsavel_recebimento', label: 'Responsável.' }
            ]}
            fieldsHtml={({ item }: any) => (
                <>
                    <td>{item.id}</td>
                    <td>{item.doador.nome}</td>
                    <td>{item.peso}</td>
                    <td>{item.quantidade_equipamentos}</td>
                    <td>{item.quantidade_equipamentos}</td>
                    <td>{item.quantidade_equipamentos}</td>
                    <td>{item.responsavel_recebimento}</td>
                </>
            )}
         
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
