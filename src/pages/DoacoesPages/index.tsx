import Crud from '../../components/Crud';
import { ReactElement, useEffect, useState } from 'react';
import Api from '../../config/Api';
import SelectInputs from '../../components/form/form-elements/SelectInputs';
import Label from '../../components/form/Label';
import Input, { InputCustom } from '../../components/form/input/InputField';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import FormDoacoesItens from './FormDonatariosItens';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Message from '../../config/Message';

type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage, setFieldValue, values }: DataProps) => {    

    const [doadores, setDoadores] = useState([]);
    const [lista, setLista] = useState([]);
    
    
    async function getLista() {
        const response = await Api.get(`doacoes-itens?doacao_id=${values.id}`);
        setLista(response.data.data);
        
        const total = response.data.data.reduce((acum: any, currentValue: any) => {
            return acum + Number(currentValue.quantidade)
        }, 0)
        setFieldValue('quantidade_equipamentos', total)
    }
    
    async function getDoadores() {
        const response = await Api.get('doadores/options')
        setDoadores(response.data.data)
    }
    
    async function handleDeleteItem(id: number) {
        await Message.confirmation("Deseja deletar este item?", async () => {
            await Api.delete(`doacoes-itens/${id}`);
            Message.success("Item Deletado com Sucesso!")
            getLista();
        });
    }

    useEffect(() => {
        getDoadores()
        getLista()
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
                        <Input type="number" disabled id="quantidade_equipamentos" name="quantidade_equipamentos" />
                        <span className="error">
                            <ErrorMessage name="quantidade_equipamentos" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Quantidade de CPUs</Label>
                        <Input type="number" id="qtde_cpu" name="qtde_cpu" />
                        <span className="error">
                            <ErrorMessage name="qtde_cpu" component="span" />
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
                    
                    <FormDoacoesItens doacao_id={values.id} loadData={getLista} />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Seq.</TableCell>
                                <TableCell>Equipamento</TableCell>
                                <TableCell>Quantidade</TableCell>
                                <TableCell>Observação</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lista && lista.map((item: any, index: number) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.equipamento}</TableCell>
                                    <TableCell>{item.quantidade}</TableCell>
                                    <TableCell>{item.observacao}</TableCell>
                                    <TableCell>
                                        <button type='button' onClick={() => handleDeleteItem(item.id)}>Excluir</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
                }  

                              

            </div>           
        </>
    );
}

export default function TurmasPages() {
    const navigate = useNavigate()
    return (
        <Crud
            BtnGrid={() => (
                <>
                    <button onClick={() => navigate('/doadores')} className='float-right flex w-full items-center justify-center gap-2 rounded-md border text-white border-green-600 bg-green-600 px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto'>
                        Doadores
                    </button>
                </>
            )}
            title="Lotes de Recebimentos"
            endPoint="doacoes"
            searchFieldName='search'
            desc="Cadastro de Recebimentos"
            emptyObject={{
                doador_id: '',
                data_recebimento: '',
                peso: '',
                quantidade_equipamentos: 0,
                tipos_equipamentos: '',
                responsavel_recebimento: '',
                
                quantidade_aprovados: '',
                quantidade_rejeitados: '',
                observacoes_tecnicas: '',

                status: '',
                data_finalizacao: '',
                qtde_cpu: 0
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
            FormSearch={({ params, setParams }: any) => (
                <>
                    <InputCustom
                        placeholder='Filtrar por Nome do Doador' 
                        type="text" id="nome" name="nome" 
                        onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                    
                    {/* <div className="flex gap-5">
                        <div className='w-[50%]'>
                            <InputCustom 
                            placeholder='Filtrar por CPF' 
                            type="text" id="cpf" name="cpf" 
                            onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                        </div>
                        <div className='w-[50%]'>
                            <InputCustom 
                            placeholder='Filtrar por E-mail' 
                            type="text" id="email" name="email" 
                            onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                        </div>
                    </div> */}
                </>
            )}
            fieldsHtml={({ item }: any) => (
                <>
                    <td>{item.id}</td>
                    <td>{item.doador.nome}</td>
                    <td>{item.peso}</td>
                    <td>{item.quantidade_equipamentos}</td>
                    <td>{item.quantidade_aprovados}</td>
                    <td>{item.quantidade_rejeitados}</td>
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

